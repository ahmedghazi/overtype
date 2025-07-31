import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { environment } from "@/env.mjs";
import { client } from "@/app/sanity-api/sanity-client";
import { Product, ProductSingle } from "@/app/types/schema";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    // res.status(405).json({ message: "INVALID_METHOD" });
    // return;
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  const body = await req.json(); // res now contains body
  const { trials, email } = body;
  console.log(trials, email);
  /**
   * collect product ids from items.metada
   */
  const _productIds = _collectProductsId(trials);

  /**
   * from these ids get content (bundles, singles)
   */
  const _productsData = await _collectProductsData(_productIds);
  console.log(_productsData);
  const _attachments = _collectZips(_productsData);
  console.log(_attachments);

  await sendEmail(
    email,
    email.split("@")[0],

    _attachments
  );

  try {
    // console.log(tsx);
    return NextResponse.json({ email });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

const _collectProductsId = (items: ProductSingle[]) => {
  let _ids: string[] = [];
  items.forEach((element: any) => {
    // const metadata = JSON.parse(element.metadata);
    const { _id } = element;
    _ids.push(_id);
  });
  return _ids;
};

const _collectProductsData = async (_ids: string[]) => {
  const query = `*[_type == "product" && _id in $_ids
    ]{
    title,
    singles[]{
      _key,
      title,
      zipTrials{
        asset->{
          url
        }
      }
    }
  }`;
  // console.log(query);
  const res = await client.fetch(query, { _ids: _ids });
  // const data = await res.json();
  return res;
};

const _collectZips = (items: Product[]) => {
  const zips: any[] = [];
  items.forEach((product) => {
    product.singles?.forEach((single) => {
      let zip = {};
      if (single.zipTrials) {
        zip = {
          filename: `${product.title}-${single.title}.zip`,
          path: single.zipTrials.asset.url,
        };
      } else {
        zip = {
          filename: "no zip found",
          path: "",
        };
      }
      zips.push(zip);
    });
  });
  return zips;
};

// const _generateAttachments = (items: any) => {
//   return items.map((item: any) => {
//     if (item.zipTrials) {
//       return {
//         filename: `${item.typefaceTitle}-${item.title}.zip`,
//         path: item.zip.asset.url,
//       };
//     } else {
//       return {
//         filename: "no zip found",
//         path: "",
//       };
//     }
//   });
// };

async function sendEmail(
  to: string,
  name: string,

  payload?: any
) {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: environment.email.user as string,
  //     pass: environment.email.pass as string,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: environment.email.user as string,
      pass: environment.email.pass as string,
    },
  });

  let mailOptions = {
    from: environment.email.from as string,
    to: to,
    subject: "Your Trials from Overtype",
    html: generateEmailHtml(name),
    attachments: payload,
  };

  await transporter.sendMail(mailOptions);
}

function generateEmailHtml(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">${"Your Trials from Overtype"}</h1>
      <p style="color: #666;">Dear ${name}</p>

      // <h2 style="color: #333; margin-top: 20px;">Trials Details</h2>



      <div style="margin-top: 30px; text-align: center; color: #888;">
        <p>Best regards,</p>
        <p>Overtype Team</p>
      </div>
    </div>
  `;
}
