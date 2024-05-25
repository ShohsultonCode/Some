// import {
//   IDocument,
//   IOrganization,
//   IProject,
//   IUser,
//   IWallet,
//   PaymentPlanType,
//   ProjectType,
// } from './models.interface';
// // chatArgs.ts
// export interface ChatArgs {
//   chatHistory: string;
//   customPrompt: string;
// }

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}


// // API response / request
export interface ITokenStructured {
  email?: string;
  name?: string;
  id: IUser['id'];
  iat?: number;
}

// export interface IRequest extends Request {
//   token?: ITokenStructured;
//   projectId?: IProject['id'];
// }

// export interface IResponseChatBot {
//   id: number;
//   type: ProjectType;
//   botToken: string;
//   botUserName: string;
//   displayName: string;
//   organizationId: number;
//   chatbotId: number;
//   defaultLanguage: string;
//   trained: boolean;
//   documents?: IDocument[];
//   createdAt: Date;
//   updatedAt?: Date;
//   deletedAt?: Date;
// }


// // Functions
// export interface IAgentOptions {
//   chatHistory?: string;
//   useInternet?: boolean;
//   vStoreTool?: {
//     name?: string;
//     description?: string;
//   };
// }

export interface VectorStoreDocument {
  id: string;
  source?: string;
  content?: string | null;
}
