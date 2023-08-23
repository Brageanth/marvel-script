import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Image from "next/image"


const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [data, setData] = useState<{data: Array<any>}>()
  const theadClass = "border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
  const tbodyClass = "border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"

  useEffect( () => {
    fetch("http://localhost:3000/api/characters").then(res => res.json()).then(setData)
  }, [])

  function renderItem({id, name, description, picture}: any) {
    return (
      <tr key={id}>
        <td className={tbodyClass}>{id}</td>
        <td className={tbodyClass}>{name}</td>
        <td className={tbodyClass}>{description}</td>
        <td className={tbodyClass}><Image width={100} height={100} alt="picture" src={picture}/></td>
      </tr>
    )
  }

  function renderItems() {
    return data?.data.map(renderItem) ?? <React.Fragment />
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <table className="table-auto">
        <thead>
          <tr>
            <th className={theadClass}>id</th>
            <th className={theadClass}>name</th>
            <th className={theadClass}>description</th>
            <th className={theadClass}>picture</th>
          </tr>
        </thead>
        <tbody>
          {renderItems()}
        </tbody>
      </table>
    </main>
  );
}
