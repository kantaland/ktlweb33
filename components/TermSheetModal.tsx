import React, { useState, useRef, useEffect } from 'react';
import { X, ShieldCheck, FileText, ArrowRight, Check, Download, Mail, DollarSign, AlertCircle, Play, Copy } from 'lucide-react';
import { Project } from '../types';
import { useAdmin } from '../contexts/AdminContext';
import { jsPDF } from 'jspdf';

interface TermSheetModalProps {
    project: Project;
    onClose: () => void;
}

const TermSheetModal: React.FC<TermSheetModalProps> = ({ project, onClose }) => {
    const { updateProject, publish } = useAdmin();
    const [signName, setSignName] = useState('');
    const [isSigned, setIsSigned] = useState(project.isSigned || false);
    const [copied, setCopied] = useState(false);

    // Investment Logic Helpers
    const parseAmount = (str: string) => {
        if (!str) return 0;
        return parseFloat(str.replace(/[^0-9.]/g, ''));
    };
    
    const formatAmount = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(num);
    };

    const fundingGoalValue = parseAmount(project.fundingGoal);
    const minInvestment = fundingGoalValue / 2;

    const [investAmountStr, setInvestAmountStr] = useState(
        project.committedAmount || formatAmount(minInvestment)
    );

    const currentInvestValue = parseAmount(investAmountStr);
    const isValidAmount = currentInvestValue >= minInvestment;

    const handleSign = () => {
        if (!signName.trim() || !isValidAmount) return;
        setIsSigned(true);
        
        // Save to backend
        updateProject(project.id, { 
            isSigned: true, 
            signedDate: new Date().toISOString(),
            signature: signName,
            committedAmount: formatAmount(currentInvestValue)
        });
        publish();
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("aoi@urbanhippyfantasy.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
         try {
            const doc = new jsPDF();
            doc.setFont("times", "bold");
            doc.setFontSize(24);
            doc.text("TERM SHEET", 105, 25, { align: "center" });
            
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("SERIES SEED PREFERRED STOCK", 105, 32, { align: "center" });
            
            doc.setFontSize(12);
            doc.setFont("times", "normal");
            
            let y = 50;
            const lineHeight = 6;
            const margin = 20;
            const pageWidth = 170; 
            
            doc.setFont("times", "bold");
            doc.text(`Project:`, margin, y); 
            doc.setFont("times", "normal");
            doc.text(project.title, margin + 25, y); 
            y += lineHeight;

            doc.setFont("times", "bold");
            doc.text(`Date:`, margin, y); 
            doc.setFont("times", "normal");
            doc.text(new Date().toLocaleDateString(), margin + 25, y); 
            y += lineHeight * 2;
            
            let rawText = "";
            const finalInvestmentAmount = project.committedAmount || formatAmount(currentInvestValue);

            if (project.contractBody) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = project.contractBody;
                rawText = tempDiv.innerText || tempDiv.textContent || "";
            } else {
                rawText = `1. THE COMPANY
${project.title}, a corporation organized under the laws of Delaware ("Company").

2. OFFERING TERMS
Total Round Size:   ${project.fundingGoal}
Pre-Money Valuation:   ${project.valuation}
Security Type:   ${project.equity}
Minimum Investment:   ${project.minCheck}

3. STRATEGIC USE OF PROCEEDS
${project.description} Funds will be allocated towards product development, cultural marketing campaigns, and strategic hires within the KANTALAND ecosystem.

4. LIQUIDITY & GOVERNANCE
Investors shall be subject to a ${project.lockup} lock-up period. The Company shall provide quarterly information rights to Major Investors.

CONFIDENTIALITY NOTICE:
This Term Sheet is for discussion purposes only and is not a binding commitment. The information contained herein is confidential and proprietary to KANTALAND.`;
            }
            
            const splitText = doc.splitTextToSize(rawText.trim(), pageWidth);
            
            if (y + (splitText.length * lineHeight) > 270) {
                let remainingLines = splitText;
                while(remainingLines.length > 0) {
                    const linesForPage = Math.floor((270 - y) / lineHeight);
                    const chunk = remainingLines.slice(0, linesForPage);
                    doc.text(chunk, margin, y);
                    remainingLines = remainingLines.slice(linesForPage);
                    if (remainingLines.length > 0) {
                        doc.addPage();
                        y = 20;
                    } else {
                        y += (chunk.length * lineHeight);
                    }
                }
            } else {
                doc.text(splitText, margin, y);
                y += (splitText.length * lineHeight) + 20;
            }

            if (y > 220) {
                doc.addPage();
                y = 30;
            }

            doc.setLineWidth(0.5);
            doc.line(margin, y, 190, y);
            y += 10;

            doc.setFont("times", "bold");
            doc.text("EXECUTED AND AGREED:", margin, y); 
            y += lineHeight * 2;
            
            doc.setFont("times", "bold");
            doc.text(`INVESTMENT COMMITMENT: ${finalInvestmentAmount}`, margin, y);
            y += lineHeight * 3;

            doc.setFont("times", "italic");
            doc.setFontSize(14);
            doc.text(signName || project.signature || "______________________", margin, y); 
            y += lineHeight;
            
            doc.setFont("times", "normal");
            doc.setFontSize(10);
            doc.text("Authorized Signature", margin, y);
            y += lineHeight;
            doc.text(`Date Signed: ${new Date().toLocaleDateString()}`, margin, y);
            
            doc.save(`${project.title.replace(/\s+/g, '_')}_TermSheet.pdf`);
        } catch (e) {
            console.error("PDF Generation Error", e);
            alert("Could not generate PDF. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8">
            <div className="bg-white w-full max-w-[1000px] h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] relative">
                
                {/* Close Button - Floats over document */}
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 p-2 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-100 rounded-full transition-all z-50 shadow-sm"
                >
                    <X size={24} className="text-black" />
                </button>

                {/* Main: The Term Sheet Document */}
                <div className="w-full h-full bg-white p-8 md:p-20 overflow-y-auto">
                    <div className="max-w-3xl mx-auto bg-white min-h-[800px] relative">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-16 pb-8 border-b border-black">
                            <div>
                                <h1 className="text-4xl font-normal text-black uppercase tracking-tight mb-2">Term Sheet</h1>
                                <span className="text-xs font-bold tracking-brand uppercase text-gray-500">Series Seed Preferred Stock</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold tracking-brand uppercase text-gray-400 block mb-1">Status</span>
                                <span className="text-sm font-bold uppercase text-black">{isSigned ? 'Executed' : 'Pending'}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-16 font-sans text-gray-900 leading-relaxed">
                            {project.contractBody ? (
                                <div dangerouslySetInnerHTML={{ __html: project.contractBody }} />
                            ) : (
                                <>
                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">01. The Company</h3>
                                        <p className="text-lg font-light text-gray-600"><strong>{project.title}</strong>, a corporation organized under the laws of Delaware ("Company").</p>
                                    </section>

                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">02. Offering Terms</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12 border-t border-gray-100 pt-8">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Total Round Size</span>
                                                <span className="text-xl font-medium">{project.fundingGoal}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Pre-Money Valuation</span>
                                                <span className="text-xl font-medium">{project.valuation}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Security Type</span>
                                                <span className="text-xl font-medium">{project.equity}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Minimum Investment</span>
                                                <span className="text-xl font-medium">{project.minCheck}</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">03. Strategic Use of Proceeds</h3>
                                        <p className="text-lg font-light text-gray-600">{project.description} Funds will be allocated towards product development, cultural marketing campaigns, and strategic hires within the KANTALAND ecosystem.</p>
                                    </section>

                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">04. Liquidity & Governance</h3>
                                        <p className="text-lg font-light text-gray-600">Investors shall be subject to a <strong>{project.lockup}</strong> lock-up period. The Company shall provide quarterly information rights to Major Investors.</p>
                                    </section>
                                </>
                            )}
                        </div>
                        
                        {/* Digital Execution & Next Steps */}
                        <div className="mt-32">
                            
                            {isSigned ? (
                                <div className="animate-[fadeIn_0.5s_ease-out]">
                                    {/* Success Banner */}
                                    <div className="bg-emerald-50 border-l-4 border-emerald-600 p-8 mb-16 flex items-start justify-between">
                                        <div>
                                            <h4 className="text-xl font-normal text-black uppercase tracking-tight mb-2">Agreement Executed</h4>
                                            <p className="text-emerald-800 text-sm">Signed electronically by {project.signature || signName} on {new Date().toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                             <span className="text-[10px] font-bold uppercase text-emerald-800/60 block mb-1">Commitment</span>
                                             <span className="text-xl font-medium text-emerald-900">{project.committedAmount}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-6 mb-24">
                                        <button onClick={handleDownload} className="flex items-center gap-3 px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-brand hover:bg-gray-800 transition-colors rounded-none">
                                            <Download size={16}/> Download PDF
                                        </button>
                                    </div>

                                    {/* Next Steps Grid */}
                                    <div className="border-t border-black pt-12">
                                        <span className="text-[10px] font-bold tracking-brand uppercase text-gray-400 block mb-12">Next Steps</span>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                            
                                            <div className="border-t border-gray-200 pt-6">
                                                <div className="flex items-baseline gap-4 mb-4">
                                                    <span className="text-4xl font-light text-gray-300">01</span>
                                                    <h5 className="text-sm font-bold uppercase tracking-brand text-black">Wiring Instructions</h5>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed font-light">
                                                    {project.wiringInstructions || "Secure wiring instructions will be transmitted via encrypted email within 24 hours to the registered partner address."}
                                                </p>
                                            </div>

                                            <div className="border-t border-gray-200 pt-6">
                                                <div className="flex items-baseline gap-4 mb-4">
                                                    <span className="text-4xl font-light text-gray-300">02</span>
                                                    <h5 className="text-sm font-bold uppercase tracking-brand text-black">Submission</h5>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                                                    Please forward the countersigned PDF to our treasury department.
                                                </p>
                                                <button 
                                                    onClick={handleCopyEmail}
                                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-brand text-black hover:opacity-60 transition-opacity"
                                                >
                                                    {copied ? <Check size={14} className="text-emerald-600"/> : <Copy size={14}/>}
                                                    <span className={copied ? "text-emerald-600" : ""}>{copied ? "Copied to Clipboard" : "aoi@urbanhippyfantasy.com"}</span>
                                                </button>
                                            </div>

                                            <div className="border-t border-gray-200 pt-6">
                                                <div className="flex items-baseline gap-4 mb-4">
                                                    <span className="text-4xl font-light text-gray-300">03</span>
                                                    <h5 className="text-sm font-bold uppercase tracking-brand text-black">Processing</h5>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed font-light">
                                                    Funds must be settled within the 24-48hr confirmation window to secure allocation.
                                                </p>
                                            </div>

                                            <div className="border-t border-gray-200 pt-6">
                                                <div className="flex items-baseline gap-4 mb-4">
                                                    <span className="text-4xl font-light text-gray-300">04</span>
                                                    <h5 className="text-sm font-bold uppercase tracking-brand text-black">Support</h5>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed font-light">
                                                    Office Hours: Mon-Fri 10am-3pm PT.<br/>
                                                    Concierge available for weekends.
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-t border-black pt-12">
                                    <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-12">Signature Required</h3>
                                    
                                    <div className="flex flex-col gap-12">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-end">
                                                 <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Investment Commitment</label>
                                                 <span className="text-[10px] font-bold uppercase tracking-brand text-gray-400">Min: {formatAmount(minInvestment)}</span>
                                            </div>
                                            <div className="relative group">
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-serif text-3xl text-black">$</span>
                                                <input 
                                                    value={investAmountStr.replace(/[^0-9.]/g, '')}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setInvestAmountStr(val ? `$${val}` : '');
                                                    }}
                                                    className={`w-full border-b py-4 pl-8 font-serif text-4xl bg-transparent outline-none text-black transition-colors ${isValidAmount ? 'border-gray-200 focus:border-black' : 'border-red-500 text-red-600'}`}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Legal Full Name</label>
                                                <input 
                                                    value={signName}
                                                    onChange={(e) => setSignName(e.target.value)}
                                                    className="w-full border-b border-gray-200 focus:border-black py-3 font-serif text-2xl italic bg-transparent outline-none placeholder-gray-300 text-black transition-colors"
                                                    placeholder="Sign Here..."
                                                />
                                            </div>
                                            <button 
                                                onClick={handleSign}
                                                disabled={!signName || !isValidAmount}
                                                className="bg-black text-white py-6 px-12 text-xs font-bold uppercase tracking-brand hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-none w-full"
                                            >
                                                <span>Execute Agreement</span>
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TermSheetModal;