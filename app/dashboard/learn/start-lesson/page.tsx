import { Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This would be fetched from an API in a real application
const getLessons = () => {
	return [
		{
			id: "introduction-to-defi",
			title: "Introduction to DeFi",
			description: "Learn the basics of decentralized finance and how it works",
			duration: "15 minutes",
			completed: true,
		},
		{
			id: "risk-management-in-defi",
			title: "Risk Management in DeFi",
			description:
				"Learn how to manage risks when participating in DeFi protocols",
			duration: "30 minutes",
			completed: false,
		},
		{
			id: "understanding-staking",
			title: "Understanding Staking",
			description: "Discover how staking works and its benefits",
			duration: "20 minutes",
			completed: true,
		},
		{
			id: "yield-farming-strategies",
			title: "Yield Farming Strategies",
			description: "Advanced strategies to maximize your yield farming returns",
			duration: "25 minutes",
			completed: true,
		},
		{
			id: "risk-management-in-defi",
			title: "Risk Management in DeFi",
			description:
				"Learn how to manage risks when participating in DeFi protocols",
			duration: "30 minutes",
			completed: false,
		},
		{
			id: "defi-security-best-practices",
			title: "DeFi Security Best Practices",
			description:
				"Essential security practices to protect your assets in DeFi",
			duration: "20 minutes",
			completed: false,
		},
	];
};

export default function LearnPage() {
	const lessons = getLessons();
	const completedLessons = lessons.filter((lesson) => lesson.completed).length;

	return (
		<div className="container py-8">
			<div className="flex flex-col gap-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Learning Center</h1>
					<p className="text-muted-foreground">
						Complete lessons to earn rewards and boost your APY
					</p>
				</div>

				<div className="flex flex-wrap gap-4 justify-between items-center">
					<div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
						<div className="flex items-center gap-1 text-green-500">
							<CheckCircle className="h-5 w-5" />
							<span className="font-medium">Level 2 Scholar</span>
						</div>
					</div>

					<div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
						<div className="flex items-center gap-1 text-amber-500">
							<span className="font-medium">
								{completedLessons}/{lessons.length} Lessons Complete
							</span>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold mb-4">Your Learning Journey</h2>
					<p className="text-muted-foreground mb-6">
						Track your progress and unlock rewards
					</p>

					<div className="space-y-6">
						{lessons.map((lesson) => (
							<div
								key={lesson.id}
								className="relative border rounded-lg p-6 hover:border-primary transition-colors"
							>
								{/* Status indicator */}
								<div className="absolute -left-3 top-6 w-6 h-6 rounded-full flex items-center justify-center bg-background border-2 border-border">
									{lesson.completed ? (
										<CheckCircle className="h-4 w-4 text-green-500" />
									) : (
										<span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
									)}
								</div>

								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
									<div>
										<h3 className="text-xl font-semibold">{lesson.title}</h3>
										<p className="text-muted-foreground">
											{lesson.description}
										</p>

										<div className="flex items-center gap-2 mt-2">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span className="text-sm text-muted-foreground">
												{lesson.duration}
											</span>
										</div>
									</div>

									<div>
										{lesson.completed ? (
											<div className="flex flex-col gap-2 items-end">
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
													Completed
												</span>
												<Button variant="outline" asChild>
													<Link href={`/review-lesson/${lesson.id}`}>
														Review Lesson
														<ArrowRight className="ml-2 h-4 w-4" />
													</Link>
												</Button>
											</div>
										) : (
											<div className="flex flex-col gap-2 items-end">
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
													Incomplete
												</span>
												<Button asChild>
													<Link href={`/start-lesson/${lesson.id}`}>
														Start Lesson
														<ArrowRight className="ml-2 h-4 w-4" />
													</Link>
												</Button>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
