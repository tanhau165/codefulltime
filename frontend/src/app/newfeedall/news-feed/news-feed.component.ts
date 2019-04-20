import {Component, HostListener, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {JarwisService} from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';
import {ImgurService} from '../../services/imgur.service';
import {AccountsService} from '../../accounts/accounts.service';
import {ActivatedRoute} from '@angular/router';
import {Accounts} from '../../models/accounts';
import {Media} from '../../models/media';
import {UploadFileService} from '../../services/upload-file.service';
import {NewsFeedService} from '../news-feed.service';
import {NewsFeed} from '../../models/news-feed';
import {ConfigService} from '../../services/config.service';

declare var CodeMirror: any;
declare var $: any;

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  editor: any;
  source: any;
  language: any;
  theme: any;
  account: Accounts;
  isLogin: any;

  listImageAfterUpload: any[] = [];
  listMineAfterUpload: any [] = [];

  publishing = false;

  newsFedds: NewsFeed[] = [];

  page = 1;
  messError: any;
  messSuccess: any;

  constructor(
    private token: TokenService,
    private jwt: JarwisService,
    private auth: AuthService,
    // private uploadImg: ImgurService,
    private uploadFile: UploadFileService,
    private accS: AccountsService,
    private newFeedS: NewsFeedService,
    private config: ConfigService
  ) {
  }

  ngOnInit() {

    this.auth.authStatus.subscribe(value => this.isLogin = value);

    this.newFeedS.getWithPage(this.page).subscribe(res => {
      res.news_feeds.forEach(nf => {
        this.newsFedds.push(new NewsFeed(nf, false));
      });
      if (res.news_feeds.length > 0) {
        this.page++;
      }
    });

    this.jwt.me(this.token.get()).subscribe(
      data => {
        this.account = data;
      }
    );
    $(window).scroll(() => {
      if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        this.newFeedS.getWithPage(this.page).subscribe(res => {
          res.news_feeds.forEach(nf => {
            this.newsFedds.push(new NewsFeed(nf, false));
          });
          if (res.news_feeds.length > 0) {
            this.page++;
          }
        });
      }
    });
  }

  showImageAfterUpload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (files[i].type.match('image/*')) {
          this.listImageAfterUpload.push({
            name: files[i].name,
            size: files[i].size,
            type: files[i].type,
            file: files[i],
            src: e.target.result
          });
        }
        if (files[i].type === 'application/pdf' ||
          files[i].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          files[i].type === 'application/x-zip-compressed' ||
          files[i].type === 'msword'
        ) {
          this.listMineAfterUpload.push({
            name: files[i].name,
            size: files[i].size,
            type: files[i].type,
            file: files[i],
            src: e.target.result
          });
        }
      };
      reader.readAsDataURL(files[i]);

    }
  }

  clearImg(name) {
    this.listImageAfterUpload = this.clearInListWithName(name, this.listImageAfterUpload);

  }

  private clearInListWithName(name: string, list: any[]) {
    const listMediaAfterUploadTemp = list;
    list = [];
    listMediaAfterUploadTemp.forEach(e => {
      if (e.name !== name) {
        list.push(e);
      }
    });
    return list;
  }

  clearMine(name: any) {
    this.listMineAfterUpload = this.clearInListWithName(name, this.listMineAfterUpload);
  }

  publish(problem) {
    this.publishing = true;
    let totalSize = 0;
    const avatar: any[] = [];
    this.listImageAfterUpload.forEach(v => {
      avatar.push(v.file);
      totalSize += v.size;
    });
    this.listMineAfterUpload.forEach(v => {
      avatar.push(v.file);
      totalSize += v.size;
    });

    if (totalSize > 5 * 1024 * 1024) {
      this.publishing = false;
      this.messError = 'Total size all of file is: ' + totalSize + '. You can upload maximum 5MB. You can click image or file if you want delete them.';
    } else {

      this.uploadFile.umloadFileList(avatar, this.token.get()).subscribe(value => {
        if (value.message === 'media-success') {
          const nf = value.newsfeed;
          this.newFeedS.add(this.token.get(), {code_news_feeds: nf.code_news_feeds, content_feeds: problem.value}).subscribe(res => {
            this.newsFedds.unshift(new NewsFeed(res.news_feed, true));
            problem.value = '';
            this.listMineAfterUpload = [];
            this.listImageAfterUpload = [];
            this.publishing = false;
            this.messSuccess = res.message;
          });
        }
      });
    }
  }


}
