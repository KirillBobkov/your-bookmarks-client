export interface ICard {
    link: string;
    title: string;
    isFavorite: boolean;
    _id: string;
}

export type IPartialCard = Omit<ICard, '_id' | 'isFavorite'>;
