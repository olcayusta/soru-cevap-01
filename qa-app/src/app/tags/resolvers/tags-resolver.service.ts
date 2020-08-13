import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Tag } from '@shared/models/tag.model';
import { TagService } from '@shared/services/tag.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsResolverService implements Resolve<Tag[]> {

  constructor(private tagService: TagService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]> | Promise<Tag[]> | any {
    return this.tagService.getAllTags();
  }
}
