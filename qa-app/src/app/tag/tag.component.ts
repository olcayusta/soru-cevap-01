import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '@shared/models/tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {
  tag: Tag;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tag = this.route.snapshot.data.tag;
  }
}
