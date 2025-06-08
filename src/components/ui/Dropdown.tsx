import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import { MusicianType } from "../../types/types";

type Props = {
  items: MusicianType[];
  onSelect: (musician: MusicianType) => void;
  placeholder?: string;
};

export default function Dropdown({ items, onSelect, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const [dropdownItems, setDropdownItems] = useState(
    items.map((musician) => ({
      label: musician.userName,
      value: musician.id,
    }))
  );

  const handleChange = (val: string | null) => {
    const selected = items.find((m) => m.id === val);
    if (selected) onSelect(selected);
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={dropdownItems}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setDropdownItems}
      placeholder={placeholder}
      onChangeValue={handleChange}
    />
  );
}
