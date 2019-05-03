import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {TokenService} from '../../services/token.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  constructor(
    private profileS: ProfileService,
    private token: TokenService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      const id = value.get('id');
      this.profileS.listSaved(id).subscribe(value1 => console.log(value1));
    });
  }

}
