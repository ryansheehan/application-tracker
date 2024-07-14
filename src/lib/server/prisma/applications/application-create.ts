import type {NewAppliction} from '../types';
import {prisma} from '../prisma';
import { CustomError, CustomErrorType } from '$lib/server/error';

export async function addApplication(newApplication: NewAppliction, userId: string) {
    // find company by case insensitive name, if not found create it
    let company = await prisma.company.findFirst({
        where: {
            name: {
                equals: newApplication.company,
                mode: "insensitive"
            },            
        },
    });
    if (!company) {
        company = await prisma.company.create({
            data: {
                name: newApplication.company,                
            }
        });        
    }
    if (!company) { throw new CustomError(CustomErrorType.Internal, "Failed to create company"); }
    

    // see if an application for the user already exists for this company with this same position
    const companyId = company.id;
    const position = newApplication.position.toLocaleLowerCase();
    const existingApplication = await prisma.application.findFirst({
        where: {
            AND: [
                {userId},
                {companyId},
                {position}             
            ]
        }
    });
    if (existingApplication) { throw new CustomError(CustomErrorType.InvalidInput, "An application for this company and position already exists."); }

    // create the application
    const application = await prisma.application.create({
        data: {
            userId,
            companyId,
            position,
            events: {
                createMany: {
                    data: [{
                        type: "APPLIED",
                        date: new Date(),
                    }]
                }
            },
            links: {
                createMany: {
                    data: newApplication.links.map(link => ({url: link, label: ''}))
                }
            }
        },        
        select: {
            id: true,
            position: true,            
            links: { select: { id: true, url: true, label: true }},
            events: { select: { id: true, type: true, date: true, notes: true}, orderBy: { date: 'desc' }},
            company: {select: { id: true, name: true }}
        }
    });
    if (!application) { throw new CustomError(CustomErrorType.Internal, "Failed to create application"); }

    return application;
}