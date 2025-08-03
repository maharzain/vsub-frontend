import { useContext } from "react";
import IphoneText from "./templates/IphoneText";
import WhatsappChat from "./templates/WhatsappChat";
import IgChat from "./templates/IgChat";
import TemplateContainer from "./TemplateContainer";
import { fakeTextContext } from "../index";

const FakeTextTemplates = () => {
  const { selectedTemplate, setSelectedTemplate } = useContext(fakeTextContext);

  const handleClick = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {/* iphone text message */}
      <TemplateContainer
        heading='iPhone text message'
        onClick={() =>
          handleClick(<IphoneText isTemplate={false} isDark={false} />)
        }
      >
        <IphoneText isTemplate={true} />
      </TemplateContainer>

      <TemplateContainer
        heading='iPhone text message (dark mode)'
        onClick={() =>
          handleClick(<IphoneText isTemplate={false} isDark={true} />)
        }
      >
        <IphoneText isTemplate={true} isDark={true} />
      </TemplateContainer>

      {/* whatsapp */}
      <TemplateContainer
        heading='WhatsApp'
        onClick={() =>
          handleClick(<WhatsappChat isTemplate={false} isDark={false} />)
        }
      >
        <WhatsappChat isTemplate={true} isDark={false} />
      </TemplateContainer>

      <TemplateContainer
        heading='WhatsApp (dark mode)'
        onClick={() =>
          handleClick(<WhatsappChat isTemplate={false} isDark={true} />)
        }
      >
        <WhatsappChat isTemplate={true} isDark={true} />
      </TemplateContainer>
      {/* instagram */}
      <TemplateContainer
        heading='Instagram'
        onClick={() => handleClick(<IgChat isTemplate={false} />)}
      >
        <IgChat isTemplate={true} />
      </TemplateContainer>

      <TemplateContainer
        heading='Instagram (dark mode)'
        onClick={() => handleClick(<IgChat isTemplate={false} isDark={true} />)}
      >
        <IgChat isTemplate={true} isDark={true} />
      </TemplateContainer>
    </div>
  );
};

export default FakeTextTemplates;
