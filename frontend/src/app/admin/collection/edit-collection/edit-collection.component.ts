import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  code_collection: any;

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(value => {
      this.code_collection = value.get('collection');
    });
  }

}
