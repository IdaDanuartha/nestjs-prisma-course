import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

  constructor(private bookmarkService: BookmarkService) {}

  // Get all bookmarks
  @Get('')
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId)
  }

  // Get bookmark by id
  @Get(':id')
  getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId)
  }

  // Store bookmark to database
  @Post()
  storeBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.storeBookmark(userId, dto)
  }

  // Update bookmark from database
  @Patch(':id')
  updateBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDto) {
    return this.bookmarkService.updateBookmark(userId, bookmarkId, dto)
  }

  // Destroy bookmark from database
  @Delete(':id')
  deleteBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.deleteBookmark(userId, bookmarkId)
  }
}
