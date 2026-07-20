// NM 16.8.2 NMAC security rule map — statutory floors enforced in validation.
// NOTE: when the Themis engine ships on callord.buildwithforge.app, this static map
// is replaced by a fetch of the current rule-map version from the Forge API.
export type Field = { k: string; label: string; type: "text" | "number" | "textarea" | "check"; req?: boolean; min?: number; max?: number; minMsg?: string; maxMsg?: string };
export type Item = { id: string; cite: string; title: string; text: string; allowNA?: boolean; naHint?: string; fields: Field[] };
export type Section = { id: string; title: string; cite: string; desc: string; items: Item[] };
export const RULES: Section[] = [
{
  id:"laa", title:"Limited-Access Areas", cite:"16.8.2.10 NMAC (intro, J)",
  desc:"Every phase of cannabis activity — cultivation, storage, weighing, packaging, manufacturing, disposal, point of sale, and the room holding the video storage device — must occur in designated limited-access areas, with product not identifiable from any public place.",
  items:[
    {id:"laa1", cite:"16.8.2.10 intro", title:"Limited-access areas designated for all cannabis activity",
     text:"All cannabis handling, POS areas, and the surveillance-storage room are inside designated limited-access areas; product cannot be identified from a public place without optical aids.",
     fields:[{k:"laaList",label:"List the limited-access areas on the premises diagram",type:"textarea",req:true}]},
    {id:"laa2", cite:"16.8.2.10(J)(2–3)", title:"Daily entry log with statutory retention",
     text:"A daily sign-in/out log of all authorized entrants to limited-access areas is maintained, kept at least 90 days (12 months after any incident), producible to the Division within 48 hours.",
     fields:[{k:"logDays",label:"Log retention period (days)",type:"number",req:true,min:90,minMsg:"Statute floor is 90 days (16.8.2.10(J)(3)). Cannot mark compliant below 90."}]},
    {id:"laa3", cite:"16.8.2.10(J)(4)", title:"Solid door or gate with compliant lock, kept locked",
     text:"Every limited-access entrance has a solid door (or adequate gate) with a commercial-grade lock per subsection I, locked when not in use during business hours unless fire code prohibits.",
     fields:[{k:"c",label:"Confirmed on premises diagram and door schedule",type:"check",req:true}]},
    {id:"laa4", cite:"16.8.2.10(J)(5)", title:"Required limited-access signage",
     text:"Each limited-access area is posted with a sign at least 12\" × 12\" reading \"Do Not Enter - Limited Access Area - Access Limited to Authorized Personnel Only\" in lettering at least 1 inch high.",
     fields:[{k:"c",label:"Sign spec confirmed (≥12\"×12\", ≥1\" lettering, exact required wording)",type:"check",req:true}]},
    {id:"laa5", cite:"16.8.2.10(J)(6–7)", title:"Badge display and visitor badge procedure",
     text:"Employees visibly display ID badges in limited-access areas at all times; visitors receive a visitor badge before entry, display it throughout, and return it on exit.",
     fields:[{k:"c",label:"Badge SOP drafted and included in package",type:"check",req:true}]}
  ]
},
{
  id:"alarm", title:"Security Alarm System", cite:"16.8.2.10(A–C)",
  desc:"An operational, continuously monitored alarm system with perimeter sensors, five-minute alerting, monthly maintenance, and twelve months of records.",
  items:[
    {id:"al1", cite:"16.8.2.10(A)", title:"Continuously monitored alarm with 5-minute alerting",
     text:"Alarm is continuously monitored (electronically, by a monitoring company, or Division-approved means) and alerts designated employees — and law enforcement if necessary — within 5 minutes of an alarm or system failure, by phone, email, or text.",
     fields:[
       {k:"monitor",label:"Monitoring method / company",type:"text",req:true},
       {k:"alertMin",label:"Guaranteed alert time (minutes)",type:"number",req:true,max:5,maxMsg:"Statute requires notification within 5 minutes (16.8.2.10(A)). Cannot mark compliant above 5."}
     ]},
    {id:"al2", cite:"16.8.2.10(A)", title:"Perimeter sensors and remotely disarmable audible alarm",
     text:"Monitored sensors on all perimeter entry points and perimeter windows; audible alarm capable of remote disarm by a designated employee or the security company.",
     fields:[{k:"c",label:"Sensor schedule confirmed against premises diagram",type:"check",req:true}]},
    {id:"al3", cite:"16.8.2.10(A)", title:"System description, zone schematic, and vendor names on file",
     text:"A written description of the system's location and operation — central control location, security-zone schematic, and names of the alarm and monitoring companies — is maintained and producible to the Division.",
     fields:[{k:"vendors",label:"Alarm company / monitoring company",type:"text",req:true}]},
    {id:"al4", cite:"16.8.2.10(B)", title:"Monthly maintenance inspection and failure protocol",
     text:"Monthly maintenance inspections with necessary repairs; any failure expected to exceed 8 hours is reported to the Division within 48 hours of discovery with alternative security (which may include closure).",
     fields:[{k:"c",label:"Maintenance calendar and failure SOP included in package",type:"check",req:true}]},
    {id:"al5", cite:"16.8.2.10(C)", title:"Twelve months of alarm maintenance records",
     text:"Documentation of all inspections, servicing, alterations, and upgrades kept at least 12 months and available at Division inspection.",
     fields:[{k:"recMonths",label:"Record retention (months)",type:"number",req:true,min:12,minMsg:"Statute floor is 12 months (16.8.2.10(C))."}]}
  ]
},
{
  id:"video", title:"Video Surveillance System", cite:"16.8.2.10(D–E)",
  desc:"Fixed, permanently mounted cameras at or above the statutory resolution floor, covering every required area with clear identification of persons and activity.",
  items:[
    {id:"v1", cite:"16.8.2.10(D)", title:"Camera resolution at or above the statutory floor",
     text:"Digital video surveillance system with minimum camera resolution of 1280 × 720 pixels, able at all times to clearly record the surveilled area.",
     fields:[
       {k:"resW",label:"Camera resolution — width (px)",type:"number",req:true,min:1280,minMsg:"Statute floor is 1280 px wide (16.8.2.10(D))."},
       {k:"resH",label:"Camera resolution — height (px)",type:"number",req:true,min:720,minMsg:"Statute floor is 720 px high (16.8.2.10(D))."}
     ]},
    {id:"v2", cite:"16.8.2.10(D)(2–3)", title:"Cameras permanently mounted, fixed, and identification-capable",
     text:"Every camera is permanently mounted in a fixed location, placed to clearly record required areas and provide clear, certain identification of persons and activities.",
     fields:[{k:"c",label:"Camera schedule and mounting plan confirmed",type:"check",req:true}]},
    {id:"v3", cite:"16.8.2.10(E)", title:"All five required coverage areas on the camera map",
     text:"Coverage is confirmed for every area the rule enumerates. Each must be checked individually — partial coverage is a deficiency.",
     fields:[
       {k:"e1",label:"Areas where cannabis is cultivated, produced, manufactured, weighed, packed, stored, loaded/unloaded, prepared, or moved",type:"check",req:true},
       {k:"e2",label:"All limited-access areas",type:"check",req:true},
       {k:"e3",label:"Room/area storing the surveillance storage device",type:"check",req:true},
       {k:"e4",label:"All entrances and exits to the licensed premises",type:"check",req:true},
       {k:"e5",label:"Every point-of-sale location, capturing transactions",type:"check",req:true}
     ]}
  ]
},
{
  id:"recording", title:"Recording, Retention & Failure", cite:"16.8.2.10(F–G)",
  desc:"Recording standards, storage security, statutory retention periods, Division production windows, and mandatory failure response.",
  items:[
    {id:"r1", cite:"16.8.2.10(F)(1)", title:"Continuous or motion-activated recording at ≥15 FPS",
     text:"Cameras record continuously 24 hours per day (or motion-activated) at a minimum of 15 frames per second.",
     fields:[{k:"fps",label:"Configured frame rate (FPS)",type:"number",req:true,min:15,minMsg:"Statute floor is 15 FPS (16.8.2.10(F)(1))."}]},
    {id:"r2", cite:"16.8.2.10(F)(3)", title:"Retention: 30 days standard, 12 months for incidents",
     text:"Recordings kept a minimum of 30 days; recordings of theft or security incidents kept a minimum of 12 months.",
     fields:[
       {k:"retDays",label:"Standard retention (days)",type:"number",req:true,min:30,minMsg:"Statute floor is 30 days (16.8.2.10(F)(3))."},
       {k:"incMonths",label:"Incident-footage retention (months)",type:"number",req:true,min:12,minMsg:"Statute floor is 12 months (16.8.2.10(F)(3))."}
     ]},
    {id:"r3", cite:"16.8.2.10(F)(2,4–7)", title:"Storage security, on-site access, 48-hour production, NIST timestamps",
     text:"Storage media secured against tampering/theft; Division can view and obtain copies on-site immediately upon request; copies delivered within 48 hours of request; time/date stamped on all recordings, timed to NIST standards.",
     fields:[{k:"c",label:"Storage, access, and timestamp procedures confirmed in SOP",type:"check",req:true}]},
    {id:"r4", cite:"16.8.2.10(G)", title:"Surveillance failure notification and cease-operations rule",
     text:"System is equipped with failure notification; any surveillance failure is reported to the Division immediately, and operations cease as soon as safely possible until the system is operational.",
     fields:[{k:"c",label:"Failure-response SOP included in package",type:"check",req:true}]}
  ]
},
{
  id:"premises", title:"Physical Premises", cite:"16.8.2.10(I, L–N, P)",
  desc:"Locks, lighting, doors and windows, outdoor fencing, and vault storage.",
  items:[
    {id:"p1", cite:"16.8.2.10(I)", title:"Commercial-grade locks meeting building and fire codes",
     text:"Commercial-grade, code-compliant locks on all limited-access areas, all premises entry/exit points, and all access points to cannabis storage.",
     fields:[{k:"c",label:"Lock schedule confirmed",type:"check",req:true}]},
    {id:"p2", cite:"16.8.2.10(L)", title:"Perimeter entry lighting to 20 feet",
     text:"Every perimeter entry point has lighting sufficient for observers to see — and cameras to record — activity within 20 feet of the gate or entry; motion-detection lighting is permitted for low-light conditions.",
     fields:[{k:"lightFt",label:"Lit/recordable radius at entry points (feet)",type:"number",req:true,min:20,minMsg:"Statute requires visibility within 20 feet (16.8.2.10(L))."}]},
    {id:"p3", cite:"16.8.2.10(M)", title:"Lockable, sound perimeter doors and windows",
     text:"All external entrances lockable; all perimeter doors and windows in good condition and lockable.",
     fields:[{k:"c",label:"Confirmed in facility walkthrough notes",type:"check",req:true}]},
    {id:"p4", cite:"16.8.2.10(N)", title:"Outdoor / greenhouse fencing, signage, and view cover", allowNA:true, naHint:"N/A only for fully indoor premises — state that in the justification.",
     text:"Outdoor or greenhouse premises require a perimeter security fence preventing unauthorized entry, the required 12\"×12\" limited-access signage, and a cover obscuring cultivation from view outside the fence.",
     fields:[{k:"c",label:"Fence, signage, and cover confirmed on site plan",type:"check",req:true}]},
    {id:"p5", cite:"16.8.2.10(P)", title:"Vault storage for idle product and cash", allowNA:true, naHint:"Vaults are permitted, not mandated — if not using one, justify how idle product/cash is otherwise secured.",
     text:"Non-growing cannabis, products, and cash not being actively handled may be stored in an adequately sized vault.",
     fields:[{k:"vaultDesc",label:"Vault location and construction summary",type:"textarea",req:true}]}
  ]
},
{
  id:"personnel", title:"Personnel & Badging", cite:"16.8.2.10(K, O)",
  desc:"Identification badge specification and security guard rules.",
  items:[
    {id:"k1", cite:"16.8.2.10(K)", title:"Compliant employee identification badges",
     text:"Laminated or plastic-coated badges for all agents/officers/employees, showing at minimum: the licensee's DBA name and license number, the individual's first name, a unique employee number, and a color photo of the full front of the face at least 1\" wide × 1.5\" high.",
     fields:[
       {k:"b1",label:"DBA name + license number on badge",type:"check",req:true},
       {k:"b2",label:"First name + unique employee number",type:"check",req:true},
       {k:"b3",label:"Color face photo ≥ 1\" × 1.5\"",type:"check",req:true}
     ]},
    {id:"k2", cite:"16.8.2.10(O)", title:"Security guard compliance", allowNA:true, naHint:"Guards are optional — mark N/A if none are used.",
     text:"If guards are used: contract guards licensed under the Private Investigations Act (§61-27B-1 NMSA 1978); no cannabis consumption or intoxication on duty; full compliance with firearms and weapons law.",
     fields:[{k:"guardCo",label:"Guard company and NM license number",type:"text",req:true}]}
  ]
},
{
  id:"incident", title:"Incident Response & Reporting", cite:"16.8.2.8(M); 16.8.2.10(F)(3)",
  desc:"What happens in the first 24 hours after a breach, and what the Division can demand afterward. Note: 16.8.2.10(F)(3) still cross-references \"Subsection N of 16.8.2.8\" — a stale reference from before the 2024 re-lettering; the reporting provision is currently at Subsection M.",
  items:[
    {id:"i1", cite:"16.8.2.8(M)", title:"24-hour incident notification to the Division",
     text:"Written notification to the Division of any attempted theft, theft, assault of employees or patrons, robbery or attempted robbery, break-in, or security breach on the premises, no later than 24 hours after the licensee first becomes aware, including a description of property stolen or destroyed and quantities of cannabis taken.",
     fields:[{k:"notifyHrs",label:"SOP notification deadline (hours)",type:"number",req:true,max:24,maxMsg:"Statute ceiling is 24 hours (16.8.2.8(N)). Cannot mark compliant above 24."}]},
    {id:"i2", cite:"16.8.2.8(M)", title:"Evidence production and premises re-securing",
     text:"Police report, video footage, and supporting evidence provided on Division request; premises secured before operations continue, including replacement of locks, doors, windows, and damaged access points with comparable or more secure materials.",
     fields:[{k:"c",label:"Incident-response SOP drafted with evidence and re-securing checklist",type:"check",req:true}]},
    {id:"i3", cite:"16.8.2.10(F)(3)", title:"Incident footage preserved 12 months",
     text:"All recordings of the theft or security incident are preserved for a minimum of 12 months.",
     fields:[{k:"c",label:"Preservation step included in incident SOP",type:"check",req:true}]}
  ]
},
{
  id:"change", title:"Diagrams & Change Management", cite:"16.8.2.23–24, .31–32, .37–38; 16.8.2.10(H)",
  desc:"The premises diagram the package is built around, and the amendment trigger most operators miss.",
  items:[
    {id:"c1", cite:"16.8.2.24 / .32 / .38 (by license type); 16.8.2.10(H)(1)", title:"Premises diagram with security overlay, to statutory format",
     text:"Premises diagram shows the alarm system and every camera location with each camera assigned an identification number; drawn to scale, in black-and-white with no highlighting; shows where surveillance recordings are stored. (Producer diagrams: 16.8.2.24; manufacturer: 16.8.2.32; retailer: 16.8.2.38.)",
     fields:[{k:"c",label:"Diagram attached — to scale, B&W, cameras numbered, security overlay complete",type:"check",req:true}]},
    {id:"c2", cite:"16.8.2.23 / .31 / .37 (by license type)", title:"Amended-license trigger acknowledged",
     text:"Client acknowledges in writing: any material or substantial change to the security system — including relocating security points or installing a new system — requires an amended license application and Division approval before implementation.",
     fields:[{k:"c",label:"Acknowledgment signed and filed",type:"check",req:true}]},
    {id:"c3", cite:"16.8.2.10(H)", title:"Shared-premises security terms", allowNA:true, naHint:"N/A for single-licensee premises.",
     text:"If multiple licensees share the premises: shared diagram of alarm/camera/storage locations, individual responsibility certifications, a written allocation of maintenance/monitoring/storage duties, and immediate footage access for every licensee.",
     fields:[{k:"c",label:"Shared-security exhibit drafted",type:"check",req:true}]}
  ]
}
];
