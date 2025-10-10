/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.pravatar.cc", // for pravatar
			},
			{
				protocol: "https",
				hostname: "ui-avatars.com", // for ui avatars
			},
			{
				protocol: "https",
				hostname: "www.shutterstock.com", // for no tasks image
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com", // for cloudinary
			},
		],
	},
};

export default nextConfig;
