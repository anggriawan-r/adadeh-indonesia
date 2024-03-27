"use client";

import {
  Table,
  TableBody,
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
import Link from "next/link";
import useSWR from "swr";
import { convertDate } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const fetcher = async (url: string, token: string) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const { data } = useLogin();
  const router = useRouter();
  const { toast } = useToast();
  const paymentStatus = {
    success: ['settlement', 'capture'],
    pending: ['pending'],
    expired: ['expire']
  }

  useEffect(() => {
    if (data?.token.length !== undefined && data?.token.length > 0) {
      if (
        searchParams.get("order_id") != null &&
        searchParams.get("status_code") != null
      ) {
        const payment = {
          order_id: searchParams.get("order_id"),
          status_code: searchParams.get("status_code"),
        };
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_URL}/payments/redirect`,
            payment,
            {
              headers: {
                Authorization: `Bearer ${data?.token}`,
              },
            },
          )
          .then((res) => {
            toast({
              title: "Success",
              description: res.data.message,
            });
            router.push("/transaction");
          })
          .catch((error) => {
            toast({
              title: "Success",
              description: error.response.data.message,
            });
          });
      }
    }
  }, [searchParams, data?.token]);

  const {
    data: historyData,
    isLoading,
    isValidating,
  } = useSWR(
    data ? [`${process.env.NEXT_PUBLIC_API_URL}/histories`, data.token] : null,
    ([url, token]) => fetcher(url, token),
  );
  return (
    <div className="mt-20 flex min-h-[calc(100vh-80px-44px)] w-full flex-col px-4">
      <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>

      <hr className="my-4 border-black" />

      {(isValidating || isLoading) && (
        <div className="self-center justify-self-center">Loading....</div>
      )}
      {historyData?.data.length > 0 &&
        historyData?.data.map((hist: any, i: number) => {
          const { dateResult } = convertDate(hist.created_at);
          return (
            <div className="mb-3 border-2 border-black" key={i}>
              <div className="flex h-max items-center justify-between bg-black p-2 text-white">
                <p>{hist.order_id}</p>
                <div className="flex flex-col items-center gap-4 text-sm sm:flex-row">
                  <p>{dateResult}</p>
                  {paymentStatus.pending.includes(hist.status) && (
                    <Link
                      href={hist.payment_url}
                      className="self-end justify-self-end"
                    >
                      <Badge variant="secondary">Bayar</Badge>
                    </Link>
                  )}
                  {paymentStatus.success.includes(hist.status) && (
                    <Badge variant="secondary">Sudah Dibayar</Badge>
                  )}
                  {paymentStatus.expired.includes(hist.status) && (
                    <Badge variant="secondary">Expired</Badge>
                  )}
                </div>
              </div>
              <ScrollArea>
                <Table className="min-w-[400px] lg:w-full">
                  <TableHeader>
                    <TableRow className="text-center">
                      <TableHead className="text-start">Produk</TableHead>
                      <TableHead className="text-center">Jumlah</TableHead>
                      <TableHead className="text-end">Harga</TableHead>
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
                            {his.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="bg-zinc-100 hover:bg-zinc-100">
                      <TableCell colSpan={2}>Total Harga</TableCell>
                      <TableCell className="text-nowrap text-right">
                        {hist.jumlah.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          );
        })}
      {historyData?.data.length === 0 && (
        <h2 className="text-center text-3xl font-bold">
          Transaksi anda kosong
        </h2>
      )}
    </div>
  );
}
