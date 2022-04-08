export interface ICard {
    link: string;
    title: string;
    isFavorite: boolean;
    previewSrc: string;
    _id: string;
}

export type IPartialCard = Omit<ICard, '_id' | 'isFavorite'>;
