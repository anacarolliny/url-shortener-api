import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParsePaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let { page, limit } = value;

    if (!page) {
      page = 1;
    } else {
      page = parseInt(page, 10);
      if (isNaN(page) || page < 1) {
        page = 1;
      }
    }

    if (!limit) {
      limit = 10;
    } else {
      limit = parseInt(limit, 10);
      if (isNaN(limit) || limit < 1) {
        limit = 10;
      }
    }

    return {
      ...value,
      page,
      limit,
    };
  }
}
