package seva

import (
    "encoding/xml"
    "fmt"
    "io/ioutil"
    "testing"

    . "github.com/franela/goblin"
    . "github.com/onsi/gomega"
)

var testinstances = map[string]string{
    "test_data.xml":               "xml/instance/test_data.xml",
    "test_instance.xml":      "xml/instance/test_instance.xml",
}
func TestSeva(t *testing.T) {
    g := Goblin(t)
    RegisterFailHandler(func(m string, _ ...int) { g.Fail(m) })

    xf, ferr := ioutil.ReadFile(testinstances["seva_test_instance.xml"])
    if ferr != nil {
        fmt.Printf(ferr.Error())
    }
    var seva = NewXSDStruct()
    err := xml.Unmarshal([]byte(xf), &seva)
    if err != nil {
        fmt.Printf(err.Error())
    }
    g.Describe("SEVA",func() {
        g.It("Must have Software Information",func() {
            Expect(seva.SoftwareInformation.ProductTitleText).To(Equal("Line text max length 48 characters."))
            Expect(seva.SoftwareInformation.SoftwareNameText).To(Equal("Line text max length 48 characters."))
            Expect(seva.SoftwareInformation.SoftwareOrgText).To(Equal("Line text max length 48 characters."))
            Expect(seva.SoftwareInformation.SoftwareVersionText).To(Equal("Line text max length 48 characters."))
            Expect(seva.SoftwareInformation.SemanticVersionText).To(Equal("1.0.0-alpha.beta"))
            Expect(seva.SoftwareInformation.SemanticVersionInformation.APIName).To(Equal("APIname"))
            Expect(seva.SoftwareInformation.SemanticVersionInformation.MajorVersionNumeric).To(Equal("1"))
            Expect(seva.SoftwareInformation.SemanticVersionInformation.MinorVersionNumeric).To(Equal("1"))
            Expect(seva.SoftwareInformation.SemanticVersionInformation.PatchVersionText).To(Equal("1"))
            Expect(seva.SoftwareInformation.SemanticVersionInformation.PreReleaseVersionText).To(Equal("-alpha"))
            Expect(seva.SoftwareInformation.SemanticVersionInformation.BuildMetaText).To(Equal("+exp.sha.5114f85"))
            Expect(seva.SoftwareInformation.PythonSemanticVersion.PythonEpochSegmentText).To(Equal("1"))
            Expect(seva.SoftwareInformation.PythonSemanticVersion.PythonReleaseSegmentText).To(Equal("0"))
            Expect(seva.SoftwareInformation.PythonSemanticVersion.PythonPreReleaseSegmentText).To(Equal("3"))
            Expect(seva.SoftwareInformation.PythonSemanticVersion.PythonPostReleaseSegmentText).To(Equal("2"))
            Expect(seva.SoftwareInformation.PythonSemanticVersion.PythonDevelopmentReleaseSegmentText).To(Equal("3"))
            Expect(seva.SoftwareInformation.PythonVersionText).To(Equal("1.0.3.2.3"))
            Expect(seva.SoftwareInformation.SemanticVersionDate).To(Equal("2018-02-15T09:00:00"))
            Expect(seva.SoftwareInformation.SemanticVersionIndicator).To(Equal("true"))
            Expect(seva.SoftwareInformation.GroupingText).To(Equal("Line text max length 48 characters."))
            Expect(seva.SoftwareInformation.ReleaseNotesText).To(Equal("Paragraph text max length 512 characters."))
        })
        g.It("Must have File Information",func() {
            Expect(seva.FileInformation.FileNameText).To(Equal("FileNameNoExtension"))
            Expect(seva.FileInformation.FileExtensionText).To(Equal(".ext"))
        })
        g.It("Must have Authoritative Source Information",func() {
            Expect(seva.AuthoritativeSourceInformation.SourceHashText).To(Equal("49FE985C79ACECDAC8AC147A88E872FF4E134650367A9D7FC1EFCBAD8C28B47C"))
            Expect(seva.AuthoritativeSourceInformation.SourceURIText).To(Equal("good:URI"))
            Expect(seva.AuthoritativeSourceInformation.AuthoritativeDigitalSignatureIndicator).To(Equal("true"))
        })
        g.It("Must have Ecosystem Information",func() {
            Expect(seva.EcosystemInformation.Ecosystem.CommitterQuantity).To(Equal("100"))
            Expect(seva.EcosystemInformation.Ecosystem.Languages.LanguageText).To(Equal("Line text max length 48 characters."))
            Expect(seva.EcosystemInformation.Ecosystem.CommitLogs.CommitLogText).To(Equal("Line text max length 48 characters."))
            Expect(seva.EcosystemInformation.CompanyInformation.Name).To(Equal("Line text max length 48 characters."))
        })
        g.It("Must have Dependency Information",func() {
            Expect(seva.DependencyInformation.Dependency.Name).To(Equal("Line text max length 48 characters."))
            Expect(seva.DependencyInformation.Dependency.DependencyVersionText).To(Equal("Line text max length 48 characters."))
            Expect(seva.DependencyInformation.Compiler.Name).To(Equal("Line text max length 48 characters."))
            Expect(seva.DependencyInformation.Compiler.CompilerVersionText).To(Equal("Line text max length 48 characters."))
        })
        g.It("Must have License Information",func() {
            Expect(seva.LicenseInformation.LicenseCategoryCode).To(Equal("FOSS"))
            Expect(seva.LicenseInformation.LicenseCode).To(Equal("LGPL"))
            Expect(seva.LicenseInformation.EndOfLifeIndicator).To(Equal("true"))
        })
        g.It("Must have Vulnerability Information",func() {
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityIdentifierText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.SourceText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityTitleText).To(Equal("Paragraph text max length 512 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilitySummaryText).To(Equal("Paragraph text max length 512 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityScoreValue).To(Equal("123.456"))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityScoreVersionValue).To(Equal("123.456"))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityScoreSystemText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.VectorStringText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.AccessVectorText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.AccessComplexityText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.VulnerabilityAuthenticationText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.ConfidentialityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.IntegrityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.AvailabilityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV2.VulnerabilityBaseScoreValue).To(Equal("123.456"))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.VectorStringText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.AccessVectorText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.AccessComplexityText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.PrivilegesRequiredText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.UserInteractionText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.VulnerabilityScopeText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.ConfidentialityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.IntegrityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.AvailabilityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.VulnerabilityBaseScoreValue).To(Equal("123.456"))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScoreDetails.CommonVulnerabilityScoringSystemV3.BaseSeverityText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityVectorText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.AccessComplexityText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityAuthenticationText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ConfidentialityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.IntegrityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.AvailabilityImpactText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilitySourceText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.AssessmentCheckText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.ScannerText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.RecommendationText).To(Equal("Paragraph text max length 512 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityReference.TypeOfReferenceText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityReference.ReferenceSourceText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityReference.URIText).To(Equal("good:URI"))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityReference.ReferenceText).To(Equal("Paragraph text max length 512 characters."))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityModifiedDate).To(Equal("2018-02-15T09:00:00"))
            Expect(seva.VulnerabilityInformation.Vulnerabilities.Vulnerability.VulnerabilityPublishedDate).To(Equal("2018-02-15T09:00:00"))
            Expect(seva.VulnerabilityInformation.VirusInformation.KnownVirusQuantity).To(Equal("100"))
            Expect(seva.VulnerabilityInformation.VirusInformation.EngineVersionText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.VirusInformation.VirusEngineText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.VirusInformation.ScannedDirectoryQuantity).To(Equal("100"))
            Expect(seva.VulnerabilityInformation.VirusInformation.ScannedFileQuantity).To(Equal("100"))
            Expect(seva.VulnerabilityInformation.VirusInformation.InfectedFileQuantity).To(Equal("100"))
            Expect(seva.VulnerabilityInformation.VirusInformation.DataScannedText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.VirusInformation.DataReadText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.VirusInformation.TimeText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.VirusInformation.FileNotesText).To(Equal("Paragraph text max length 512 characters."))
            Expect(seva.VulnerabilityInformation.VirusInformation.EngineDetails.EngineVersionText).To(Equal("Line text max length 48 characters."))
            Expect(seva.VulnerabilityInformation.VirusInformation.EngineDetails.DatabaseVersionText).To(Equal("Line text max length 48 characters."))
        })
        g.It("Must have Governance Risk Compliance",func() {
            Expect(seva.GovernanceRiskCompliance.RiskCode).To(Equal("medium"))
            Expect(seva.GovernanceRiskCompliance.StatementOfAssuranceText).To(Equal("Paragraph text max length 512 characters."))
        })
        g.It("Must have Delivery Information",func() {
            Expect(seva.DeliveryInformation.DeliveringOrganizationText).To(Equal("Line text max length 48 characters."))
            Expect(seva.DeliveryInformation.DestinationText).To(Equal("Line text max length 48 characters."))
            Expect(seva.DeliveryInformation.HashText).To(Equal("49FE985C79ACECDAC8AC147A88E872FF4E134650367A9D7FC1EFCBAD8C28B47C"))
            Expect(seva.DeliveryInformation.LastRegistryUpdateDate).To(Equal("2018-02-15T09:00:00"))
        })
    })

}