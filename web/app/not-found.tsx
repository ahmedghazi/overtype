import Link from "next/link";

function NotFoundPage() {
  return (
    <div className='page-404 px-lg py-xxl text-center'>
      <h1 className='mb-lg md:text-2xl'>Oops! Page not found</h1>
      <div className='mb-2xl'>
        <p>
          Looks like this page doesn’t exist anymore <br />
          or maybe it never did.
        </p>
      </div>
      <Link href='/' className='ui-btn ui-btn__accent'>
        Go to the home
      </Link>
    </div>
  );
}

export default NotFoundPage;
