import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  
  constructor(private prisma: PrismaService) {}

  // Get all bookmarks  
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId
      }
    })
  }

  // Get bookmark by id  
  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId
      }
    })
  }

  // Store bookmark to database  
  async storeBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto
      }
    })

    return bookmark
  }

  // Update bookmark from database  
  async updateBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    // get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId
      }
    }) 

    // check if user owns the bookmark
    if(!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied')
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId
      },
      data: {
        ...dto
      }
    })
  }

  // Destroy bookmark from database  
  async deleteBookmark(userId: number, bookmarkId: number) {
    // get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId
      }
    })

    // check if user owns the bookmark
    if(!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId
      }
    })
  }

}
