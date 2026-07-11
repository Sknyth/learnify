import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Play, Lock } from "lucide-react"

type Lesson = {
	id: string
	title: string
	duration: string
	isFree: boolean
}

type Module = {
	id: string
	title: string
	lessons: Lesson[]
}

export default function Curriculum({ modules }: { modules: Module[] }) {
	return (
		<div className="bg-white border border-gray-200 rounded-2xl p-6">
			<h2 className="text-2xl font-bold mb-6">Curriculum</h2>

			<Accordion multiple={true} className="flex flex-col gap-3">
				{modules.map((module, index) => (
					<AccordionItem
						key={module.id}
						value={module.id}
						className="border border-gray-200 rounded-xl px-4"
					>
						<AccordionTrigger className="hover:no-underline py-4">
							<span className="font-bold">
								Module {index + 1} — {module.title}
							</span>
							<span className="text-gray-400 text-sm font-normal ml-2">
								{module.lessons.length} lessons
							</span>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col gap-1 pb-2">
								{module.lessons.map((lesson) => (
									<div
										key={lesson.id}
										className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-50"
									>
										<div className="flex items-center gap-3">
											{lesson.isFree ? (
												<Play className="w-4 h-4 text-[#4f46e5]" />
											) : (
												<Lock className="w-4 h-4 text-gray-300" />
											)}
											<span className={lesson.isFree ? "text-[#4f46e5] font-medium" : "text-gray-400"}>
												{lesson.title}
											</span>
											{lesson.isFree && (
												<span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
													Free
												</span>
											)}
										</div>
										<span className="text-gray-400 text-sm">{lesson.duration}</span>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}