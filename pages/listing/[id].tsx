import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCartState } from "../../components/Cart/CartContext";

export const Pagination = ({ url }: { url: string | string[] }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="p-4 btn-group ">
          {url !== "1" ? (
            <Link href={`/listing/${Number(url) - 1}`}>
              <button className="btn">«</button>
            </Link>
          ) : (
            <button className="btn btn-disabled">«</button>
          )}
          <Link href={`/listing/${url}`}>
            <button className="btn ">Page {url} / 169</button>
          </Link>
          {url !== "169" ? (
            <Link href={`/listing/${Number(url) + 1}`}>
              <button className="btn">»</button>
            </Link>
          ) : (
            <button className="btn btn-disabled">»</button>
          )}
        </div>
      </div>
    </>
  );
};

export default function SSGPage({ data }: { data: SSRPageProps[] }) {
  const router = useRouter();
  const url = router.query.id;
  const cartState = useCartState();

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading 🚨 ...
      </div>
    );

  return (
    <>
      {url && <Pagination url={url} />}
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Cart</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {Number(data.length) > 0 &&
              data.map((x) => {
                return (
                  <>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>{x.id}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="w-12 h-12 mask mask-squircle">
                              <Image
                                src={x.image}
                                alt="Avatar Tailwind CSS Component"
                                layout="responsive"
                                width={16}
                                height={16}
                                objectFit="contain"
                                quality={1}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{x.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>{x.longDescription.slice(0, 30)}...</td>
                      <td>{x.price}$</td>
                      <th>
                        <div className="rating rating-sm">
                          {Array.from(
                            Array(Math.ceil(x.rating.rate)).keys()
                          ).map((x) => {
                            return (
                              <>
                                {" "}
                                <input
                                  name="rating-5"
                                  className="bg-orange-400 mask mask-star-2"
                                />
                              </>
                            );
                          })}
                        </div>
                      </th>
                      <th>
                        <button
                          onClick={() => {
                            cartState.addItemToCart({
                              id: x.id,
                              price: x.price,
                              title: x.title,
                              count: 1,
                            });
                          }}
                        >
                          Add
                        </button>
                      </th>
                      <th>
                        <Link href={`/product/${x.id}`}>More</Link>
                      </th>
                    </tr>
                  </>
                );
              })}

            {Number(data.length) === 0 && (
              <div className="flex items-center justify-center">
                Lack of data...
              </div>
            )}
          </tbody>

          <tfoot>
            <tr>
              <th></th>
              <th>#</th>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Cart</th>
              <th>Detail</th>
            </tr>
          </tfoot>
        </table>

        {url && <Pagination url={url} />}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }

  const res = await fetch(
    ` https://naszsklep-api.vercel.app/api/products?take=25&offset=${
      (Number(params.id) - 1) * 25
    }`
  );
  const data = await res.json();
  return {
    props: { data },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

interface SSRPageProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: string;
}

interface Rating {
  rate: number;
  count: number;
}
