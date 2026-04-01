"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Download,
  ExternalLink,
  Share2,
  CheckCircle,
  Calendar,
} from "lucide-react"

interface Certificate {
  id: string
  courseName: string
  instructor: string
  issueDate: string
  credentialId: string
  isNFT: boolean
  nftAddress?: string
  grade: string
  skills: string[]
}

interface CertificateCardProps {
  certificate: Certificate
  onDownload?: () => void
  onShare?: () => void
  onVerify?: () => void
}

export function CertificateCard({
  certificate,
  onDownload,
  onShare,
  onVerify,
}: CertificateCardProps) {
  return (
    <Card className="overflow-hidden bg-card border-border transition-all hover:border-primary/50 hover:shadow-lg">
      {/* Certificate Preview */}
      <div className="relative aspect-[1.4/1] bg-gradient-to-br from-primary/20 via-accent/10 to-chart-3/20 p-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-lg" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <Award className="h-12 w-12 text-primary mb-2" />
          <h3 className="text-lg font-bold text-foreground">Certificate of Completion</h3>
          <p className="mt-2 text-sm text-muted-foreground">This certifies that</p>
          <p className="text-lg font-semibold text-foreground">John Doe</p>
          <p className="text-sm text-muted-foreground">has successfully completed</p>
          <p className="mt-1 font-medium text-primary">{certificate.courseName}</p>
        </div>
        {certificate.isNFT && (
          <Badge className="absolute right-3 top-3 bg-chart-3/20 text-chart-3">
            <CheckCircle className="mr-1 h-3 w-3" />
            NFT Verified
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Instructor</span>
            <span className="text-sm font-medium text-foreground">{certificate.instructor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Issue Date</span>
            <span className="flex items-center gap-1 text-sm font-medium text-foreground">
              <Calendar className="h-3 w-3" />
              {certificate.issueDate}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Grade</span>
            <Badge className="bg-accent/20 text-accent">{certificate.grade}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Credential ID</span>
            <code className="text-xs font-mono text-primary">{certificate.credentialId}</code>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Skills</span>
          <div className="flex flex-wrap gap-1">
            {certificate.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm" onClick={onVerify}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
