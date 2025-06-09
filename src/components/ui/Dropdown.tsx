import DropDownPicker from "react-native-dropdown-picker";
import React, { useEffect, useState } from "react";
import { MusicianType } from "../../types/types";

type Props = {
  items: MusicianType[];
  onSelect: (musician: MusicianType) => void;
  value: MusicianType | null;
  placeholder?: string;
};

export default function Dropdown({
  items,
  onSelect,
  value,
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string | null>(
    value?.id ?? null
  );
  const [dropdownItems, setDropdownItems] = useState(
    items.map((musician) => ({
      label: musician.userName,
      value: musician.id,
    }))
  );

  useEffect(() => {
    setDropdownValue(value?.id ?? null);
  }, [value]);

  const handleChange = (val: string | null) => {
    const selected = items.find((m) => m.id === val);
    if (selected) onSelect(selected);
  };

  return (
    <DropDownPicker
      open={open}
      value={dropdownValue}
      items={dropdownItems}
      setOpen={setOpen}
      setValue={setDropdownValue}
      setItems={setDropdownItems}
      placeholder={placeholder}
      onChangeValue={handleChange}
    />
  );
}
