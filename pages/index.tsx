import { dummyData, dummyResponse } from "@/utils/contants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { File } from "formidable";
import { useAtom } from "jotai";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import styled from "styled-components";
import { useAccount } from "wagmi";
import { hostAtom } from "./_app";

const Home: NextPage = () => {
  const { address } = useAccount();

  const [schema, setSchema] = useState("pages");
  const [data, setData] = useState({
    ...dummyData,
    accessAddress: address,
  });
  const [updateData, setUpdateData] = useState({
    ...dummyData,
    data: {
      ...dummyData.data,
      title: "Introduction to SurfDB 🏄‍♂️",
    },
    accessAddress: address,
  });

  const [inputFile, setInputFile] = useState<any>(null);

  const [getResponse, setGetResponse] = useState();
  const [postResponse, setPostResponse] = useState();
  const [putResponse, setPutResponse] = useState();
  const [fileResponse, setFileResponse] = useState();

  const [docId, setDocId] = useState("632f467e389f12f1f724bd9a");
  const [host, setHost] = useAtom(hostAtom);

  const [getTime, setGetTime] = useState(0);
  const [postTime, setPostTime] = useState(0);
  const [putTime, setPutTime] = useState(0);
  const [fileTime, setFileTime] = useState(0);

  useEffect(() => {
    setData({
      ...data,
      accessAddress: address,
    });
    setUpdateData({
      ...updateData,
      accessAddress: address,
    });
  }, [address]);

  return (
    <Container>
      <div className="banner">
        <Image src="/surfLogo.svg" height="300" width="1000" />
        <p>Database made for dapps</p>
      </div>
      <div className="dashboard">
        <h1>Let's go surfing 🏄</h1>
        <p>
          SurfDB is a decentralized database built on top of ceramic and cached
          using redis for fast response times.
        </p>
        <p>
          Try out the demo below to see the different features of{" "}
          <span className="surf">SurfDB</span> 🤯
        </p>
        <hr />
        <h2>Authenticate 🔑</h2>
        <p>
          You need to authenticate with the surf client before performing any
          operations
        </p>
        <div className="row">
          <input value={host} onChange={(e) => setHost(e.target.value)} />
          <ConnectButton chainStatus="icon" accountStatus="avatar" />
        </div>

        <hr />
        <h2>Create Data 🔢</h2>
        <h3>Schema Name</h3>
        <p>Enter the schema name under which this data will be created</p>
        <div className="row">
          <input value={schema} onChange={(e) => setSchema(e.target.value)} />
          <button
            onClick={async () => {
              let start = performance.now();
              const res = await (
                await fetch(`/api/data?schema=${schema}&host=${host}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ data }),
                })
              ).json();
              console.log({ res });
              let end = performance.now();
              setPostTime(end - start);
              setPostResponse(res);
            }}
          >
            Create Data
          </button>
        </div>
        <h3>Data</h3>
        <textarea
          className="json"
          value={JSON.stringify(data, null, 2)}
          onChange={(e) => setData(JSON.parse(e.target.value))}
        />
        <h3>Response</h3>
        <textarea
          className="json"
          disabled
          id="setValue"
          value={JSON.stringify(postResponse, null, 2)}
        />
        <div className="time">
          <p>{postTime.toFixed(1)} ms</p>
        </div>
        <hr />

        <h2>Get Data 📊</h2>
        <h3>Schema Name</h3>
        {/* <p>Enter the schema will be createdname under which this data </p> */}
        <div className="row">
          <input value={schema} onChange={(e) => setSchema(e.target.value)} />
          <button
            onClick={async () => {
              let start = performance.now();
              const res = await (
                await fetch(`/api/data?schema=${schema}&host=${host}`)
              ).json();
              let end = performance.now();
              setGetTime(end - start);
              console.log({ res });
              setGetResponse(res);
            }}
          >
            Get Data
          </button>
        </div>

        <h3>Response</h3>
        <textarea
          className="json"
          disabled
          value={JSON.stringify(getResponse, null, 2)}
        />
        <div className="time">
          <p>{getTime.toFixed(1)} ms</p>
        </div>
        <hr />
        <h2>Update Data 🔁</h2>
        <h3>Document ID</h3>
        {/* <p>Enter the schema will be createdname under which this data </p> */}
        <div className="row">
          <input value={docId} onChange={(e) => setDocId(e.target.value)} />
          <button
            onClick={async () => {
              let start = performance.now();
              const res = await (
                await fetch(
                  `/api/data?schema=${schema}&host=${host}&id=${docId}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data }),
                  }
                )
              ).json();
              let end = performance.now();
              setPutTime(end - start);
              console.log({ res });
              setPutResponse(res);
            }}
          >
            Update Data
          </button>
        </div>
        <h3>Data</h3>
        <textarea
          className="json"
          value={JSON.stringify(updateData, null, 2)}
          onChange={(e) => setUpdateData(JSON.parse(e.target.value))}
        />
        <h3>Response</h3>
        <textarea
          className="json"
          disabled
          value={JSON.stringify(putResponse, null, 2)}
        />
        <div className="time">
          <p>{putTime.toFixed(1)} ms</p>
        </div>
        <hr />
        <h2>Upload file 📄</h2>
        <p>Upload files to dedicated IPFS node</p>
        <input
          type="file"
          onChange={async (e) => {
            let start = performance.now();
            const file = e.target.files && e.target.files[0];
            const formData = new FormData();
            console.log({ file });
            formData.append("file", file as any);
            const res = await (
              await fetch(`/api/file?host=${host}`, {
                method: "POST",
                body: formData,
              })
            ).json();
            console.log({ res });
            setFileResponse(res);
            let end = performance.now();
            setFileTime(end - start);
          }}
        />
        <h3>Response</h3>
        <textarea
          className="json"
          disabled
          value={JSON.stringify(fileResponse, null, 2)}
        />
        <div className="time">
          <p>{fileTime.toFixed(1)} ms</p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;

  p {
    padding: 0;
    margin: 0.4rem 0;
  }

  .banner {
    background: #404b69;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-bottom: 100px;

    p {
      color: #fff;
      font-weight: 600;
      font-size: 24px;
      margin-top: 20px;
    }
  }

  .dashboard {
    background: #000;
    width: 50%;
    padding: 3.5rem;
    height: 100vh;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    hr {
      border: 1px solid #fff;
      border-radius: 8px;
      margin-top: 2rem;
    }

    h1 {
      color: #fff;
      font-weight: 600;
      font-size: 32px;
      letter-spacing: 1.5px;
    }

    h2 {
      color: #fff;
      font-weight: 600;
      font-size: 28px;
      letter-spacing: 1px;
      margin: 1rem 0;
      padding: 0;
    }

    h3 {
      color: #fff;
      font-weight: 400;
      font-size: 20px;
      margin: 1rem 0;
      padding: 0;
    }

    p {
      color: #fff;
      font-weight: 200;
      font-size: 17px;
      letter-spacing: 0.7px;

      .surf {
        color: #00fb94;
        font-weight: 600;
      }
    }

    label {
      color: #fff;
      font-weight: 200;
      font-size: 16px;
    }

    input {
      width: 200px;
      padding: 10px;
      border-radius: 10px;
      border: 2px solid #fff;
      margin-right: 20px;

      &:focus {
        outline: none;
        border: 2px solid #00fb94;
      }
    }

    .json {
      width: 100%;
      height: 200px;
      min-height: 200px;
      color: black;
      background: #f9f9f9;
      padding: 15px;
      border-radius: 10px;
      border: 1px solid lightgrey;
      box-sizing: border-box;
    }

    .json::-webkit-scrollbar {
      display: none;
    }

    .row {
      display: flex;
      flex-direction: row;
    }

    button {
      background: transparent;
      border: 2px solid #fff;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      padding: 0px 20px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: #fff;
        color: #000;
      }
    }

    .time {
      p {
        font-weight: 600;
        letter-spacing: 0.1px;
        color: #00fb94;
      }
    }
  }
`;

export default Home;
