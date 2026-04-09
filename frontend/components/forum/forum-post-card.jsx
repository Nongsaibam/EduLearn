"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Eye, Pin, CheckCircle, Clock, } from "lucide-react";
const roleColors = {
    student: "bg-primary/20 text-primary",
    teacher: "bg-accent/20 text-accent",
    admin: "bg-chart-3/20 text-chart-3",
};
export function ForumPostCard({ post, onClick }) {
    return (<Card className="bg-card border-border transition-colors hover:border-primary/50 cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={post.author.avatar}/>
            <AvatarFallback className="bg-primary/20 text-primary">
              {post.author.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-start gap-2">
              {post.isPinned && (<Badge className="bg-chart-3/20 text-chart-3">
                  <Pin className="mr-1 h-3 w-3"/>
                  Pinned
                </Badge>)}
              {post.isResolved && (<Badge className="bg-accent/20 text-accent">
                  <CheckCircle className="mr-1 h-3 w-3"/>
                  Resolved
                </Badge>)}
              <h3 className="font-semibold text-foreground line-clamp-1 flex-1">
                {post.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {post.author.name}
                </span>
                <Badge className={`text-xs ${roleColors[post.author.role]}`}>
                  {post.author.role}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3"/>
                {post.createdAt}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              {post.tags.slice(0, 2).map((tag) => (<Badge key={tag} variant="outline" className="text-xs border-border">
                  #{tag}
                </Badge>))}
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                <ThumbsUp className="mr-1 h-4 w-4"/>
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                <MessageSquare className="mr-1 h-4 w-4"/>
                {post.replies}
              </Button>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3"/>
                {post.views} views
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>);
}
