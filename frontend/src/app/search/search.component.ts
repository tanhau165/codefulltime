import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {Search} from '../models/search';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  resultSearch: Search;
  keyword: string;
  isLogin: any;
  isAvaliable = true;
  totalResult = 0;

  constructor(
    private sS: SearchService,
    private router: ActivatedRoute,
    private kwS: SearchService,
    private auth: AuthService,
  ) {
    this.auth.authStatus.subscribe(value => this.isLogin = value);
  }

  ngOnInit() {
    this.resultSearch = null;
    this.totalResult = 0;
    this.isAvaliable = true;
    this.router.paramMap.subscribe(value => {
      this.keyword = value.get('keyword');
      this.kwS.add(this.keyword).subscribe(res => {
        console.log(res);
        this.resultSearch = new Search(res.list);
        this.totalResult += this.resultSearch.medias.length
          + this.resultSearch.exercises.length
          // + this.resultSearch.examinations.length
          + this.resultSearch.news_feeds.length
        ;
        if (this.resultSearch.news_feeds.length === 0 && this.resultSearch.examinations.length === 0 && this.resultSearch.exercises.length === 0 && this.resultSearch.medias.length === 0) {
          this.isAvaliable = false;
        }
      });
    });
  }

  getListImageMedia(medias) {
    const ds = [];
    medias.forEach(m => {
        if (m.type_media.match('image/*')) {
          ds.push(m);
        }
      }
    );
    console.log(ds);
    return ds;
  }

  getListMineMedia(medias) {
    const ds = [];
    medias.forEach(m => {
        if (m.type_media === 'application/pdf' ||
          m.type_media === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          m.type_media === 'application/x-zip-compressed' ||
          m.type_media === 'msword'
        ) {
          ds.push(m);
        }
      }
    );
    console.log(ds);
    return ds;
  }

}
