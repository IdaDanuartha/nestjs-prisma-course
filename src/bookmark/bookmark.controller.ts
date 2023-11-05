import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

  // Get all bookmarks
  @Get('')
  getBookmarks(@GetUser('id') userId: number) {}

  // Get bookmark by id
  @Get(':id')
  getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {}

  // Store bookmark to database
  @Post()
  storeBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {}

  // Update bookmark from database
  @Patch(':id')
  updateBookmark(@GetUser('id') userId: number, @Body() dto: EditBookmarkDto) {}

  // Destroy bookmark from database
  @Delete(':id')
  deleteBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {}
}
