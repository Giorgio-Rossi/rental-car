export interface ButtonConfig {
    label: string; 
    type?: 'button' | 'submit' | 'reset'; 
    disabled?: boolean; 
    style?: {
      color?: string; 
      backgroundColor?: string; 
      border?: string;
    };
  }