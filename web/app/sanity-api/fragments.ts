export const seo = `
	...,
	metaImage{
		asset->
	}
`;

export const figure = `
	...,
	image{
		asset->
	},
	caption,
	link->{
		_type,
		slug
	}
`;

export const blockContent = `
	...,
	en[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,

			},
		},
		_type == 'icon' => {
			...,
			image{
				asset->
			},
    }
	},
	fr[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,

			},

		},
		_type == 'icon' => {
			...,
			image{
				asset->
			},
    }
	}
`;

export const productCard = `
	_type,
	slug,
	title,
	tag->{
		title
	},
	background,
	foreground,
	defaultTypeface->{
		...,
		_key,
		title,
		price,
		isDefault,
		typeface->{
			slug,
			title,
			typefaceFile{
				base64
			}
		},
	}


`;

const productsUI = `
  _type == 'productsUI' => {
    ...,
    items[]-> {
      ${productCard}
    }
  }
`;
const fontsInUseUI = `
  _type == 'fontsInUseUI' => {
		title,
		items[] {
			image{
        ${figure}
      },
			title,
			source,
			product->{
				_type,
				slug,
				title,
				background,
				foreground
			}
		}

  }
`;

const storiesUI = `
  _type == 'storiesUI' => {
		title,
		items[] {
			image{
      	${figure}
    	},
			caption,
			credit
		}

  }
`;

const textUI = `
	_type == 'textUI' => {
		...,
		fullWidth,
		text{
			${blockContent}
		}
	}
`;

export const modules = `
	...,
	${productsUI},
	${fontsInUseUI},
	${storiesUI},
	${textUI}
`;

/*

export const introUI = `
	_type ==  'introUI' => {
		...,
		items[]{
			...,
			asset->
		}
	}
`;

export const marqueeUI = `
	_type == 'marqueeUI' => {
		...
	}
`;

export const textImagesUI = `
	_type == 'textImagesUI' => {
		...,
		text{
			${blockContent}
		},
		textFooter{
			${blockContent}
		},
		images[]{
			asset->
		}
	}
`;

export const devisUI = `
	_type == 'devisUI' => {
		...,
		image{
			${figure}
		}
	}
`;

export const listLieuxUI = `
	_type == 'listLieuxUI' => {
		...,
		items[]->{
			...,
			imageCover{
				asset->
			}
		}
	}
`;

export const listMarquesUI = `
	_type == 'listMarquesUI' => {
		...,
		items[]->{
			...,
			imageCover{
				asset->
			}
		},
		cta{
			...,
			link->{
				_type,
				slug
			}
		}
	}
`;

export const eventsUI = `
	_type == 'eventsUI' => {
		...,
		items[]->{
			...,
			_type,
			slug,
			title,
			date,
			imageCover{
				asset->
			},
			location->{
				title
			},
			savoirsFaire->{
				title
			}
		},
		cta{
			...,
			link->{
				_type,
				slug
			}
		}
	}
`;

export const collageUI = `
	_type == 'collageUI' => {
		...,
		images[]{
			...,
			asset->
		},
		cta{
			...,
			link->{
				_type,
				slug
			}
		}
	}
 `;

export const locationsMapUI = `
	_type == 'locationsMapUI' => {
		...,
		items[]->{
			title,
			logo{
				asset->
			},
			tag->{
				slug
			},
			xy,
			color
		},
		nav[]->{
			...
		}
	}
`;

export const listCardImageUI = `
	_type == 'listCardImageUI' => {
		...,
		items[]{
			...,
			image{
				${figure}
			}
		},
		cta{
			...,
			link->{
				_type,
				slug
			}
		}
	}
`;
export const listCardTextUI = `
	_type == 'listCardTextUI' => {
		...,
		items[]{
			...,
		}
	}
`;

export const listImagesUI = `
	_type == 'listImagesUI' => {
		...,
		images[]{
			asset->
		}
	}
`;

export const navUI = `
	_type == 'navUI' => {
		...,
		images[]{
			...,
			asset->
		},
		nav[]{
			_type == 'linkInternal' => {
				...,
				link->{
					_type,
					slug,
					subTitle,
					color
				},
			},
		}
	}
`;

export const contactUI = `
	_type == 'contactUI' => {
		...,
		images[]{
				...,
				asset->
		},
		socials[]{
			...,
			icon{
				asset->
			}
		}
	}
`;

export const scrollerImagesUI = `
	_type == 'scrollerImagesUI' => {
		...,
		images[]{
				...,
				asset->
		},
		imageAlt{
			...,
			asset->
		}
	}
`;

// "defaultTypeface" : singles[][_type == 'productSingle' && isDefault == true][0] {
	// 	...,
	// 	_key,
	// 	title,
	// 	price,
	// 	isDefault,
	// 	typeface->{
	// 		slug,
	// 		title,
	// 		typefaceFile{
	// 			base64
	// 		}
	// 	},
	// }
*/
