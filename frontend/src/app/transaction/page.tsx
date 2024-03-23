import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"


export default function TransactionPage() {
    return (
        <>
            <div className="pt-20 px-4">
                <h1 className="font-bold text-2xl">Riwayat Transaksi</h1>
                <hr className="my-4 border-black" />
                <div className="border-2 border-black mb-3">
                    <div className="flex justify-between bg-black text-white p-2">
                        <p>Transaksi #121323</p>
                        <div className="lg:flex space-x-3 text-nowrap text-right text-sm">
                        <p>22 Maret 2024 18:12:21</p>
                        <Badge variant="secondary">Sudah Dibayar</Badge>
                        </div>
                    </div>
                    <ScrollArea>
                        <Table className="min-w-[400px] lg:w-full">
                            <TableHeader>
                                <TableRow className="text-center">
                                    <TableHead className="text-center">Produk</TableHead>
                                    <TableHead className="text-center">Jumlah</TableHead>
                                    <TableHead className="text-center">Harga</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={`https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg`}
                                                alt="Sepatu"
                                                width={70}
                                                height={70}
                                            />
                                            <p>Sepatu Hitam Sepatu Hitam Sepatu Hitam Sepatu Hitam</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">2 Pcs</TableCell>
                                    <TableCell className="text-right text-nowrap">Rp. 232.000</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={`https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg`}
                                                alt="Sepatu"
                                                width={70}
                                                height={70}
                                            />
                                            <p>Sepatu Hitam</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">2 Pcs</TableCell>
                                    <TableCell className="text-right text-nowrap">Rp. 232.000</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2}>Total Harga</TableCell>
                                    <TableCell className="text-right text-nowrap">Rp. 5.232.000</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <div className="border-2 border-black mb-3">
                    <div className="flex justify-between bg-black text-white p-2">
                        <p>Transaksi #121323</p>
                        <div className="lg:flex space-x-3 text-nowrap text-right text-sm">
                        <p>22 Maret 2024 18:12:21</p>
                        <Badge variant="secondary">Sudah Dibayar</Badge>
                        </div>
                    </div>
                    <ScrollArea>
                        <Table className="min-w-[400px] lg:w-full">
                            <TableHeader>
                                <TableRow className="text-center">
                                    <TableHead className="text-center">Produk</TableHead>
                                    <TableHead className="text-center">Jumlah</TableHead>
                                    <TableHead className="text-center">Harga</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={`https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg`}
                                                alt="Sepatu"
                                                width={70}
                                                height={70}
                                            />
                                            <p>Sepatu Hitam Sepatu Hitam Sepatu Hitam Sepatu Hitam</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">2 Pcs</TableCell>
                                    <TableCell className="text-right text-nowrap">Rp. 232.000</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={`https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg`}
                                                alt="Sepatu"
                                                width={70}
                                                height={70}
                                            />
                                            <p>Sepatu Hitam</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">2 Pcs</TableCell>
                                    <TableCell className="text-right text-nowrap">Rp. 232.000</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2}>Total Harga</TableCell>
                                    <TableCell className="text-right text-nowrap">Rp. 5.232.000</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}