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
		],
	},
};

export default nextConfig;
