import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {TokenService} from '../../services/token.service';
import {ActivatedRoute} from '@angular/router';
import {Media} from '../../models/media';

@Component({
  selector: 'app-stored',
  templateUrl: './stored.component.html',
  styleUrls: ['./stored.component.css']
})
export class StoredComponent implements OnInit {
  saves: Media[] = [];

  constructor(
    private profileS: ProfileService,
    private token: TokenService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      const id = value.get('id');
      this.profileS.listMedias(id).subscribe(value1 => {
        value1.medias.forEach(media => {
          this.saves.push(new Media(media));
        });
      });
    });
  }

}
