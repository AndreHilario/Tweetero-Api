import { IsInt, Min } from 'class-validator';

export class GetTweetsDto {
    @IsInt({ message: 'Informe uma página válida!' })
    @Min(1, { message: 'Informe uma página válida!' })
    page: number;
}
