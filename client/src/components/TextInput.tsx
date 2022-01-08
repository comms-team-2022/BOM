import { Button } from "@chakra-ui/button";
import { Input, InputProps } from "@chakra-ui/input";
import { useState } from "react";

interface TextInputProps extends InputProps {
    submitFunction: (v: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ submitFunction, ...props }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                submitFunction(inputValue);
                setInputValue("");
            }}
        >
            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} {...props} />
            <Button type="submit" disabled={!inputValue}>
                Submit
            </Button>
        </form>
    );
};
