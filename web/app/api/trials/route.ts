import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { environment } from "@/env.mjs";
import { client } from "@/app/sanity-api/sanity-client";
import { Product, ProductSingle, User } from "@/app/types/schema";
import { v4 as uuidv4 } from "uuid";

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
  const storeUserTrials = await _storeUserTrials(email, _productIds);
  console.log(storeUserTrials);
  if (!storeUserTrials) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 500 }
    );
  }
  /**
   * from these ids get content (bundles, singles)
   */
  const _productsData = await _collectProductsData(_productIds);
  // console.log(_productsData);

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
    zipTrials{
      asset->{
        url
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
    let zip = {};
    if (product.zipTrials) {
      zip = {
        filename: `${product.title}.zip`,
        path: product.zipTrials.asset.url,
      };
    } else {
      zip = {
        filename: "no zip found",
        path: "",
      };
    }
    zips.push(zip);
    // product.singles?.forEach((single) => {
    //   let zip = {};
    //   if (single.zipTrials) {
    //     zip = {
    //       filename: `${product.title}-${single.title}.zip`,
    //       path: single.zipTrials.asset.url,
    //     };
    //   } else {
    //     zip = {
    //       filename: "no zip found",
    //       path: "",
    //     };
    //   }
    //   zips.push(zip);
    // });
  });
  return zips;
};

const _storeUserTrials = async (
  email: string,
  trials: string[]
): Promise<User> => {
  try {
    const query = `*[_type == "user" && email == "${email}"]`;
    const res = await client.fetch(query);
    if (res.length > 0) {
      const user = res[0];
      // user.trials = [...user.trials, ...trials];
      await client
        .patch(user._id)
        .set({
          trials: trials.map((item) => ({
            _type: "reference",
            _ref: item,
            _key: uuidv4(),
          })),
        })
        .commit();
    } else {
      await client.create({
        _type: "user",
        email: email,
        trials: trials.map((item) => ({
          _type: "reference",
          _ref: item,
          _key: uuidv4(),
        })),
      });
    }
    return res;
  } catch (error) {
    console.error("Error storing trials:", error);
    throw new Error("Failed to store trials data");
  }
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
      <h1 style="color: #333; font-weight: 400; text-align:center">Your trials from Overtype</h1>
      <p style="color: #666;">Hi,</p>
      <p style="color: #666;">Thank you for trying out our typefaces!</p>
      <p style="color: #666;">Please note that the trial versions include only basic characters (letters, numbers, and punctuation).</p>
      <p style="color: #666;">When you're ready, you can purchase a full license at <a href="https://www.overtypefoundry.com">www.overtypefoundry.com</a></p>
      <p style="color: #666;">We'd love to see what you create — feel free to share your work with us!</p>

      <div style="margin-top: 30px;  color: #333;">
        <p style="color: #666;">All the best,<br />
        Overtype</p>
      </div>
      <div>
        <div style="margin:0 auto; width:119px">
          <img src="https://cdn.sanity.io/images/ltdaocfm/production/bbaeb32bbba9a7a83dd9e98c55aa849d694959d0-120x80.png" width="119" height="80" alt="logo overtype" />
        </div>
      </div>
    </div>
  `;
}
