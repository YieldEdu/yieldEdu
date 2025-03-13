import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";

const page = () => {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
						Settings
					</h1>
					<p className="text-slate-500 dark:text-slate-400">
						Manage your account preferences
					</p>
				</div>
			</div>

			<Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
				<CardHeader>
					<CardTitle className="text-slate-900 dark:text-white">
						Account Settings
					</CardTitle>
					<CardDescription className="text-slate-500 dark:text-slate-400">
						Customize your experience
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
								Appearance
							</h3>
							<div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
								<div>
									<p className="font-medium text-slate-900 dark:text-white">
										Theme
									</p>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Choose between light and dark mode
									</p>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm text-slate-500 dark:text-slate-400">
										Light
									</span>
									<Button
										variant="outline"
										size="icon"
										className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
									>
										<Sun className="h-4 w-4 text-yellow-500" />
									</Button>
									<Button
										variant="outline"
										size="icon"
										className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
									>
										<Moon className="h-4 w-4 text-indigo-500" />
									</Button>
									<span className="text-sm text-slate-500 dark:text-slate-400">
										Dark
									</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
								Notifications
							</h3>
							<div className="space-y-2">
								<div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
									<div>
										<p className="font-medium text-slate-900 dark:text-white">
											Staking Alerts
										</p>
										<p className="text-sm text-slate-500 dark:text-slate-400">
											Get notified about staking events
										</p>
									</div>
									<div>
										<Switch />
									</div>
								</div>

								<div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
									<div>
										<p className="font-medium text-slate-900 dark:text-white">
											Learning Reminders
										</p>
										<p className="text-sm text-slate-500 dark:text-slate-400">
											Receive reminders to complete lessons
										</p>
									</div>
									<div>
										<Switch />
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default page;

function Switch() {
	return (
		<div className="w-10 h-5 bg-lime-500 rounded-full relative">
			<div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
		</div>
	);
}
