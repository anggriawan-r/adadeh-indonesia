"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useLogin } from "@/stores/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = async (url: string, token: string) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export default function TransactionPage() {
  const [history, setHistory] = useState({
    get: true,
    data: [],
  });
  const { data } = useLogin();

  const {
    data: historyData,
    isLoading,
    isValidating,
  } = useSWR(
    data ? [`${process.env.NEXT_PUBLIC_API_URL}/histories`, data.token] : null,
    ([url, token]) => fetcher(url, token),
  );

  // useEffect(() => {
  //   if (history.get) {
  //     axios
  //       .get(`${process.env.NEXT_PUBLIC_API_URL}/histories`, {
  //         headers: {
  //           Authorization: `Bearer ${data.token}`,
  //         },
  //       })
  //       .then((res: any) => {
  //         setHistory({ ...history, data: res.data.data, get: false });
  //       });
  //   }
  // }, [history]);

  return (
    <>
      <div className="px-4 pt-20">
        <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>
        <hr className="my-4 border-black" />
        {historyData?.data.length == 0 && <div>Loading....</div>}
        {historyData?.data.length > 0 &&
          historyData?.data.map((hist: any, i: number) => (
            <div className="mb-3 border-2 border-black" key={i}>
              <div className="flex justify-between bg-black p-2 text-white">
                <p>{hist.order_id}</p>
                <div className="space-x-3 text-nowrap text-right text-sm lg:flex">
                  <p>{hist.created_at}</p>
                  {hist.status == "pending" && (
                    <>
                      <Badge variant="secondary">
                        <Link href={hist.payment_url} target="_blank">
                          Bayar
                        </Link>
                      </Badge>
                    </>
                  )}
                  {hist.status == "success" && (
                    <Badge variant="secondary">Sudah Dibayar</Badge>
                  )}
                </div>
              </div>
              <ScrollArea>
                <Table className="min-w-[400px] lg:w-full">
                  <TableHeader>
                    <TableRow className="text-center">
                      <TableHead className="text-start">Produk</TableHead>
                      <TableHead className="text-center">Jumlah</TableHead>
                      <TableHead className="text-center">Harga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hist.history.length == 0 && (
                      <TableRow>
                        <TableCell colSpan={3}>Tidak ada pembelajaan</TableCell>
                      </TableRow>
                    )}
                    {hist.history.length > 0 &&
                      hist.history.map((his: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              {/* <Image
                                                    src={`https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg`}
                                                    alt="Sepatu"
                                                    width={70}
                                                    height={70}
                                                /> */}
                              <p>{his.name}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {his.quantity} Pcs
                          </TableCell>
                          <TableCell className="text-nowrap text-right">
                            Rp. {his.price}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total Harga</TableCell>
                      <TableCell className="text-nowrap text-right">
                        Rp. {hist.jumlah}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ))}
      </div>
    </>
  );
}
