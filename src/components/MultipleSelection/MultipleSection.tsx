import React, { useState } from "react";
import "./multipleSection.css";

interface Props {
  items: {
    id: number;
    label: string;
    value: string;
  }[];
}

function Checklist(props: Props) {
  const { items } = props;

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [open,setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = (item: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };
 
  // const SelectAll = () => {
  //   if (selectedItem.length > 0) {
  //     setSelectedItem([]);
  //   }
  //   else {
  //     setSelectedItem(items.map((item) => item.label));
  //   }
  
  //   const allSelected = filteredItems.every((item) =>
  //     selectedItem.includes(item.label)
  //   );

  // };

  const SelectAll = () => {
    const filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );

    const allSelected = filteredItems.every((item) =>
      selectedItem.includes(item.label)
    );

    if (allSelected) {
      // Deselect all filtered items
      setSelectedItem((prev) =>
        prev.filter((item) => !filteredItems.some((fi) => fi.label === item))
      );
    } else {
      // Select all filtered items
      // const newSelected = new Set(selectedItem);
      // filteredItems.forEach((item) => newSelected.add(item.label));
      // setSelectedItem(Array.from(newSelected));

      const newSelected = [
        ...selectedItem,
        ...filteredItems
          .filter((item) => !selectedItem.includes(item.label))
          .map((item) => item.label),
      ];
      setSelectedItem(newSelected);
    }
  };

  const combinedItem = selectedItem.join(", ");

  const filteredItems = items.filter((item) =>
    item.label.includes(search)
  );


  return (
    <div className="itemsingrocery">
      <h1>Grocery Item</h1>

      <div className="AddingItem" onClick={() => setOpen(!open)}>
         <input type="text" value={combinedItem}
         className="Itemsadd"/>
      </div>
       
     {open &&  
     <div className="selectitem" >
        <input type="Search" value={search}
        onChange={(e) => setSearch(e.target.value)}
        defaultValue="Search" 
        className="searchbar"/>
        <br />
        <label>
          <input type="checkbox" onChange={SelectAll}/>
          Select All
        </label>
        <br />
        {filteredItems.map((item) => (
          <>
            <label className="multipleoption">
            <input type="checkbox" 
            checked={selectedItem.includes(item.label)}
            onChange={()=>handleClick(item.label)} 
            />
            {item.label}
            <br />
            </label>
          </>
        ))}
      </div> 
      }
    </div>
  )
}

export default Checklist;
