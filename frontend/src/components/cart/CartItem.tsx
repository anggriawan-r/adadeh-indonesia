import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface CartItemProps {
  id: number;
  name: string;
  jumlah: number;
  image_url: string;
  harga: number;
  onRemove: (id: number) => void;
  onCheck: (id: number, isChecked: boolean) => void;
  checked: boolean;
  onCount: (id: number, jumlah: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  jumlah,
  image_url,
  harga,
  checked,
  onCount,
  onRemove,
  onCheck,
}) => {
  const [count, setCount] = useState(jumlah);

  const handleCount = (value: number) => {
    onCount(id, value);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  const handleCheck = () => {
    const newChecked = !checked;
    onCheck(id, newChecked);
  };

  const increment = () => {
    setCount(count + 1);
    handleCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      handleCount(count - 1);
    }
  };

  return (
    <div className="mb-4 border-b border-black p-4">
      <div className="flex justify-between">
        <div className="hidden lg:flex">
          <div className="flex h-full items-center justify-center">
            <Checkbox checked={checked} onClick={handleCheck} id={`${id}`} />
            <label className="ml-4" htmlFor={`${id}`}></label>
          </div>
          <div className="h-fit w-fit border border-black">
            <Image src={image_url} alt="image" width={150} height={150} />
          </div>
          <div className="mx-6 flex flex-col">
            <h1 className="text-xl font-medium">{name}</h1>
            <div className="mt-4 flex w-20 justify-between border border-black px-2 py-1 font-medium">
              <button onClick={decrement}>-</button>
              <span>{count}</span>
              <button onClick={increment}>+</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:hidden">
          <div className="flex">
            <div className="flex h-full items-center justify-center">
              <Checkbox checked={checked} onClick={handleCheck} id={`${id}`} />
              <label className="ml-4" htmlFor={`${id}`}></label>
            </div>
            <div className="h-fit w-fit border border-black">
              <Image src={image_url} alt="image" width={50} height={50} />
            </div>
            <div className="flex flex-col">
              <div className="mx-4 flex h-1/2 w-20 items-center justify-between border border-black px-2 py-1 font-medium">
                <button onClick={decrement}>-</button>
                <span>{count}</span>
                <button onClick={increment}>+</button>
              </div>
              <h1 className="mx-4 mt-1">Rp {harga}</h1>
            </div>
          </div>
          <div className="mt-1 w-full">
            <h1>{name}</h1>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between text-end">
          <button onClick={handleRemove}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="hidden text-lg font-medium lg:block">Rp {harga}</h1>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
