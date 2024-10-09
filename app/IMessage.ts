interface IMessage 
{
    _id: number,
    text: string | undefined,
    createdAt: Date,
    system: boolean,
    user: { _id: number }


}