"use client";

import { NoDocuments } from "@/components/empty/NoDocuments";
import Title from "@/components/ui/Title";
import { AuthWrapper, BodyWrapper } from "@/components/Wrapper";
import { useAuthStore } from "@/stores/AuthStore";
import React, { useEffect, useRef, useState } from "react";
import { fetchDocuments } from "@/helpers/fetchHelpers";
import { AccountRequired } from "@/components/empty/AccountRequired";
import { FaTableCells } from "react-icons/fa6";
import { FaTh } from "react-icons/fa";
import clsx from "clsx";
import { Row } from "@/components/Row";
import { Card } from "@/components/Card";
import Head from "next/head";
import Input from "@/components/ui/Input";

export default function View() {

  const [documents, setDocuments] = useState([]);
  const [viewType, setViewType] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { userStore } = useAuthStore();
  const hasFetched = useRef(false);

  const getDocuments = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const { result } = await fetchDocuments(userStore.id);
    setDocuments(Array.isArray(result) ? result : []);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userStore) {
      setIsLoading(true);
      getDocuments().then(() => null);
    }
  }, [userStore]);

  if (userStore === null) {
    return (
      <>
        <Head>
          <link rel="icon" href="/icons/logo.ico" sizes="any" />
          <title>DocStock | View Documents</title>
        </Head>
        <AuthWrapper>
          <AccountRequired />
        </AuthWrapper>
      </>
    );
  }

  if (documents.length === 0 && !isLoading) {
    return (
      <>
        <Head>
          <link rel="icon" href="/icons/logo.ico" sizes="any" />
          <title>DocStock | View Documents</title>
        </Head>
        <AuthWrapper>
          <NoDocuments />
        </AuthWrapper>
      </>
    );
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/icons/logo.ico" sizes="any" />
        <title>DocStock | View Documents</title>
      </Head>
      <BodyWrapper>
        <div className="mt-[15%] flex items-center justify-between md:mt-0">
          <Title>View Documents</Title>
          <div className="invisible flex gap-4 md:visible">
            <FaTableCells
              size={28}
              onClick={() => setViewType(!viewType)}
              className={clsx(
                "cursor-pointer",
                !viewType ? "opacity-25" : ""
              )}
            />
            <FaTh
              size={28}
              onClick={() => setViewType(!viewType)}
              className={clsx(
                "cursor-pointer",
                viewType ? "opacity-25" : ""
              )}
            />
          </div>
        </div>
        <div className="w-full my-4">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
          />
        </div>
        {viewType && TableView(documents, setDocuments, search)}
        {!viewType && GridView(documents, setDocuments, search)}
      </BodyWrapper>
    </>
  );
}

function TableView(documents, setDocuments, search) {
  return (
    <div className="my-4 flex flex-col gap-2">
      <div
        className="flex flex-row items-center gap-4 rounded-md bg-[var(--secondary-black)] px-6 py-2 text-left brightness-150">
        <div className="w-24">Sr. No.</div>
        <div className="w-96">File Name</div>
        <div className="w-72">File Type</div>
        <div className="w-64">Uploaded</div>
        <div className="ml-auto flex-shrink-0"></div>
      </div>
      {documents.map((doc, index) => (
        <div key={doc._id}>
          <Row
            {...doc}
            index={index}
            search={search}
            documents={documents}
            setDocuments={setDocuments}
          />
        </div>
      ))}
    </div>
  );
}

function GridView(documents, setDocuments, search) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {documents.map((doc, index) => (
        <div key={doc._id} className="flex flex-col h-full">
          <Card
            {...doc}
            index={index}
            search={search}
            documents={documents}
            setDocuments={setDocuments}
            className="h-full flex flex-col"
          />
        </div>
      ))}
    </div>
  );
}
