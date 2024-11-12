export type CardProps = {
    title: string;
    discription: string;
    amount: string;
}

export default function Card(props: CardProps) {
    return (
        <CardContent className="text-COLORS-TEXT_WHITE">
            <div className="flex justify-between gap-2">
                <p className="text-sm font-medium">{props.title}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">{props.amount}</h1>
                <p className="text-xs ">{props.discription}</p>
            </div>
        </CardContent>
    )
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className="flex w-full flex-col gap-3 rounded-xl border p-5 bg-COLORS-BACKGROUND_UI shadowt" />
    )
}