import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '@shared/models/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  tags: Tag[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tags = this.route.snapshot.data.tags;
  }
}
