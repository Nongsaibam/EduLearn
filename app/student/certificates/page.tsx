"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { CertificateCard } from "@/components/certificates/certificate-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Award, CheckCircle, Shield, Wallet } from "lucide-react"

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

const certificates: Certificate[] = [
  {
    id: "1",
    courseName: "Data Structures & Algorithms",
    instructor: "Dr. Emily Chen",
    issueDate: "Mar 15, 2026",
    credentialId: "CERT-2026-DS-001",
    isNFT: true,
    nftAddress: "0x1234...5678",
    grade: "A+",
    skills: ["Algorithms", "Data Structures", "Problem Solving", "Python"],
  },
  {
    id: "2",
    courseName: "Introduction to Machine Learning",
    instructor: "Prof. Michael Brown",
    issueDate: "Feb 28, 2026",
    credentialId: "CERT-2026-ML-042",
    isNFT: true,
    nftAddress: "0xabcd...ef01",
    grade: "A",
    skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis"],
  },
  {
    id: "3",
    courseName: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    issueDate: "Jan 10, 2026",
    credentialId: "CERT-2026-WD-128",
    isNFT: false,
    grade: "A-",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "4",
    courseName: "Advanced Mathematics",
    instructor: "Dr. Sarah Smith",
    issueDate: "Dec 20, 2025",
    credentialId: "CERT-2025-AM-256",
    isNFT: false,
    grade: "B+",
    skills: ["Calculus", "Linear Algebra", "Statistics"],
  },
]

const stats = [
  { label: "Total Certificates", value: "4", icon: <Award className="h-5 w-5" /> },
  { label: "NFT Certificates", value: "2", icon: <Shield className="h-5 w-5" /> },
  { label: "Verified", value: "4", icon: <CheckCircle className="h-5 w-5" /> },
]

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const nftCertificates = certificates.filter((c) => c.isNFT)
  const regularCertificates = certificates.filter((c) => !c.isNFT)

  const handleVerify = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setVerifyDialogOpen(true)
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Certificates</h1>
            <p className="text-muted-foreground">
              View, download, and share your earned certificates
            </p>
          </div>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="text-primary">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
            className="pl-9 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Certificates */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="all">All ({certificates.length})</TabsTrigger>
            <TabsTrigger value="nft">NFT ({nftCertificates.length})</TabsTrigger>
            <TabsTrigger value="regular">Standard ({regularCertificates.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onVerify={() => handleVerify(certificate)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nft">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nftCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onVerify={() => handleVerify(certificate)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regular">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onVerify={() => handleVerify(certificate)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Verify Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Certificate Verification</DialogTitle>
            <DialogDescription>
              Verify the authenticity of this certificate
            </DialogDescription>
          </DialogHeader>
          {selectedCertificate && (
            <div className="space-y-4">
              <div className="rounded-lg bg-accent/10 p-4 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-accent" />
                <p className="mt-2 font-semibold text-foreground">Certificate Verified</p>
                <p className="text-sm text-muted-foreground">
                  This certificate is authentic and valid
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course</span>
                  <span className="font-medium text-foreground">
                    {selectedCertificate.courseName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credential ID</span>
                  <code className="font-mono text-primary">
                    {selectedCertificate.credentialId}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Date</span>
                  <span className="font-medium text-foreground">
                    {selectedCertificate.issueDate}
                  </span>
                </div>
                {selectedCertificate.isNFT && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NFT Address</span>
                    <code className="font-mono text-chart-3">
                      {selectedCertificate.nftAddress}
                    </code>
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={() => setVerifyDialogOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
