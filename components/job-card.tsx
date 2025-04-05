import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    logo: string;
    match?: number;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={job.logo || "/placeholder.svg"}
            alt={job.company}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5 mr-1" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{job.posted}</span>
          </div>
        </div>
        {job.match && (
          <div className="mt-4 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
            {job.match}% Match
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" size="sm">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
