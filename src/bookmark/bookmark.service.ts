import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  
  // Get all bookmarks  
  getBookmarks(userId: number) {

  }

  // Get bookmark by id  
  getBookmarkById(userId: number, bookmarkId: number) {

  }

  // Store bookmark to database  
  storeBookmark(userId: number, dto: CreateBookmarkDto) {

  }

  // Update bookmark from database  
  updateBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    
  }

  // Destroy bookmark from database  
  deleteBookmark(userId: number, bookmarkId: number) {

  }

}
