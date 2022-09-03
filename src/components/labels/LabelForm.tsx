export function LabelForm(props: { text: string}) {
    return (
        <label className="mt-2">
            {props.text}
        </label>
    );
}