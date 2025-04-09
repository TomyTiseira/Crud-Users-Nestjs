import { ApiQuery } from '@nestjs/swagger';

export const SearchQuery = () =>
  ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Filtro de búsqueda',
  });
