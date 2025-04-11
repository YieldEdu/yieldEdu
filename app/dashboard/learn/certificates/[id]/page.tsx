import {
	ArrowLeft,
	Download,
	Share2,
	Trophy,
	Clock,
	Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// This would be fetched from an API in a real application
const getLessonById = (id: string) => {
	const lessons = {
		"introduction-to-defi": {
			id: "introduction-to-defi",
			title: "Introduction to DeFi",
			description: "Learn the basics of decentralized finance and how it works",
			duration: "15 minutes",
			completed: true,
			completedDate: "March 15, 2025",
		},
		"understanding-staking": {
			id: "understanding-staking",
			title: "Understanding Staking",
			description: "Discover how staking works and its benefits",
			duration: "20 minutes",
			completed: true,
			completedDate: "March 16, 2025",
		},
		"yield-farming-strategies": {
			id: "yield-farming-strategies",
			title: "Yield Farming Strategies",
			description: "Advanced strategies to maximize your yield farming returns",
			duration: "25 minutes",
			completed: true,
			completedDate: "March 17, 2025",
		},
	};

	return lessons[id as keyof typeof lessons];
};

export default function CertificatePage({
	params,
}: {
	params: { id: string };
}) {
	const lesson = getLessonById(params.id);

	if (!lesson) {
		return <div className="text-center py-10">Certificate not found</div>;
	}

	return (
		<div className="container max-w-4xl mx-auto py-8">
			<div className="mb-6">
				<Link
					href="/learn"
					className="flex items-center text-muted-foreground hover:text-primary"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Learning Center
				</Link>
			</div>

			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Your Certificate
					</h1>
					<p className="text-muted-foreground">
						Congratulations on completing {lesson.title}
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Share2 className="mr-2 h-4 w-4" />
						Share
					</Button>
					<Button size="sm">
						<Download className="mr-2 h-4 w-4" />
						Download
					</Button>
				</div>
			</div>

			<Card className="overflow-hidden border-2 border-primary/20 mb-8">
				<CardContent className="p-0">
					<div className="relative bg-gradient-to-r from-primary/10 to-primary/5 p-8">
						<div className="absolute top-0 right-0 w-32 h-32 opacity-10">
							<Image
								src="/placeholder.svg?height=128&width=128"
								alt="YieldEdu Logo"
								width={128}
								height={128}
								className="object-contain"
							/>
						</div>

						<div className="flex flex-col items-center text-center space-y-6 py-8">
							<div className="rounded-full bg-primary/10 p-4">
								<Trophy className="h-12 w-12 text-primary" />
							</div>

							<div>
								<h2 className="text-xl text-muted-foreground uppercase tracking-widest mb-2">
									Certificate of Completion
								</h2>
								<h3 className="text-4xl font-bold mb-6">{lesson.title}</h3>

								<p className="text-xl mb-2">This certifies that</p>
								<p className="text-2xl font-bold mb-6">Your Name</p>

								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Has successfully completed the {lesson.title} course on
									YieldEdu, demonstrating proficiency in decentralized finance
									concepts and applications.
								</p>
							</div>

							<div className="grid grid-cols-2 gap-8 w-full max-w-md mt-4">
								<div className="flex flex-col items-center">
									<Calendar className="h-5 w-5 text-muted-foreground mb-1" />
									<p className="text-sm text-muted-foreground">Completed On</p>
									<p className="font-medium">{lesson.completedDate}</p>
								</div>
								<div className="flex flex-col items-center">
									<Clock className="h-5 w-5 text-muted-foreground mb-1" />
									<p className="text-sm text-muted-foreground">Duration</p>
									<p className="font-medium">{lesson.duration}</p>
								</div>
							</div>
						</div>

						<div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
							<div className="flex items-center">
								<Image
									src="/placeholder.svg?height=40&width=40"
									alt="YieldEdu Logo"
									width={40}
									height={40}
									className="mr-3"
								/>
								<div>
									<p className="font-bold">YieldEdu</p>
									<p className="text-xs text-muted-foreground">
										Learn & Earn Protocol
									</p>
								</div>
							</div>

							<div className="text-right">
								<p className="text-sm">Certificate ID</p>
								<p className="font-mono text-xs text-muted-foreground">
									YE-{lesson.id.toUpperCase()}-
									{Math.floor(Math.random() * 10000)
										.toString()
										.padStart(4, "0")}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="bg-muted/50 rounded-lg p-6">
				<h3 className="text-lg font-medium mb-4">What&apos;s Next?</h3>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="flex">
						<div className="mr-4 flex-shrink-0">
							<div className="rounded-full bg-primary/10 p-2">
								<Trophy className="h-5 w-5 text-primary" />
							</div>
						</div>
						<div>
							<h4 className="font-medium">Continue Learning</h4>
							<p className="text-sm text-muted-foreground">
								Complete more lessons to earn additional rewards and boost your
								APY.
							</p>
							<Button variant="link" asChild className="px-0">
								<Link href="/learn">View More Lessons</Link>
							</Button>
						</div>
					</div>
					<div className="flex">
						<div className="mr-4 flex-shrink-0">
							<div className="rounded-full bg-primary/10 p-2">
								<Share2 className="h-5 w-5 text-primary" />
							</div>
						</div>
						<div>
							<h4 className="font-medium">Share Your Achievement</h4>
							<p className="text-sm text-muted-foreground">
								Share your certificate on social media to showcase your
								knowledge.
							</p>
							<Button variant="link" className="px-0">
								Share Certificate
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
