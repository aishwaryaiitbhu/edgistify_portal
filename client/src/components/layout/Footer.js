import React from "react";
// a function based component because footer component has no states, so no need to use a class based component here
//create a normal HTML to be rendered inside a functinal based component and export it
export default function Footer() {
  return (
    <footer className='bg-dark text-white mt-5 p-4 text-center'>
      Copyright &copy; {new Date().getFullYear()} Edgistify
    </footer>
  );
}
