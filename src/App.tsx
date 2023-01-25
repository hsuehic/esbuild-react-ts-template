import React, { Suspense } from "react";

const Comment = React.lazy(() => import("./Comment"));

export default function App() {
  return (
    <div>
      <h1>Hello World, Esbuild!</h1>
      <Suspense fallback={<div>Load...</div>}>
        <Comment />
      </Suspense>
    </div>
  );
}
